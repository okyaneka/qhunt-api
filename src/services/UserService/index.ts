import User, { UserListQuery, UserPayload, UserRole } from "~/models/User";
import { compare, hash } from "bcryptjs";
import { ENV } from "~/configs";
import { sign } from "jsonwebtoken";
import UserPublic from "~/models/UserPublic";
import db from "~/helpers/db";

export const register = async (payload: UserPayload, code?: string) => {
  return await db.transaction(async (session) => {
    const email = payload.email;
    const userExists = await User.findOne({ email }).session(session);
    if (userExists) throw new Error("email taken");

    const password = await hash(payload.password, 10);

    const [user] = await User.create(
      [
        {
          email,
          password,
          role: UserRole.Public,
        },
      ],
      { session }
    );

    await UserPublic.findOneAndUpdate(
      { code },
      { $set: { user: { id: user._id, name: user.name } } },
      { new: true, session }
    );

    return user;
  });
};

export const login = async (payload: UserPayload) => {
  const email = payload.email;
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");

  const isPasswordValid = await compare(payload.password, user.password);

  if (!isPasswordValid) throw new Error("invalid password");

  const userPublic = await UserPublic.findOne({ "user.id": user._id });

  if (!userPublic) throw new Error("invalid user");

  const token = sign({ id: user._id }, ENV.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  const { _id: id, name } = user;

  return { id, name, email, TID: userPublic?.code, token };
};

export const profile = async (bearer: string) => {};

export const list = async (params: UserListQuery) => {};

export const create = async (payload: UserPayload) => {};

export const detail = async (id: string) => {
  const user = await User.findOne({ _id: id, deletedAt: null }).catch(() => {});

  if (!user) throw new Error("user not found");

  const meta = await UserPublic.findOne({ "user.id": user._id }).catch(
    () => {}
  );

  return { ...user.toObject(), meta: meta?.toObject() };
};

export const update = async (id: string, payload: UserPayload) => {};

export const _delete = async (id: string) => {};

const UserService = {
  register,
  login,
  profile,
  list,
  create,
  detail,
  update,
  delete: _delete,
};

export default UserService;

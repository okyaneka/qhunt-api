import User, { UserListQuery, UserPayload, UserRole } from "~/models/User";
import { compare, hash } from "bcryptjs";
import { ENV } from "~/configs";
import { sign } from "jsonwebtoken";

export const register = async (payload: UserPayload) => {
  const email = payload.email;
  const userExists = await User.findOne({ email });
  if (userExists) return new Error("email taken");

  const password = await hash(payload.password, 10);
  return await User.create({ email, password, role: UserRole.Public });
};

export const login = async (payload: UserPayload) => {
  const email = payload.email;
  const user = await User.findOne({ email });
  if (!user) return new Error("user not found");

  const isPasswordValid = await compare(payload.password, user.password);

  if (!isPasswordValid) return new Error("invalid password");

  const token = sign({ id: user._id }, ENV.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  const { _id: id, name } = user;

  return { id, name, email, token };
};

export const profile = async (bearer: string) => {};

export const list = async (params: UserListQuery) => {};

export const create = async (payload: UserPayload) => {};

export const detail = async (id: string) => {
  return await User.findOne({ _id: id, deletedAt: null }).catch(() => {
    return new Error("user not found");
  });
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

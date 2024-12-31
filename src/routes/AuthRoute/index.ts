import { Router } from "express";
import response from "~/helpers/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "~/configs";
import { AuthMiddleware } from "~/middlewares";
import {
  AuthLoginPayloadSchema,
  AuthRegisterPayloadSchema,
} from "~/validators/AuthValidator";
import User from "~/models/User";

const AuthRoute = Router();

AuthRoute.get("/profile", AuthMiddleware, async (req, res) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(" ")[1];

  const { id } = jwt.decode(token || "") as { id: string };
  const user = await User.findById(id);
  res.json(response.success(user?.toObject()));
});

AuthRoute.post("/login", async (req, res) => {
  const { value, error } = AuthLoginPayloadSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const validation = error.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});
    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const email = value.email;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json(response.error({}, "user not found"));
    return;
  }

  const isPasswordValid = await bcrypt.compare(value.password, user.password);

  if (!isPasswordValid) {
    res.status(400).json(response.error({}, "invalid password"));
    return;
  }

  const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  res.json(response.success({ ...user.toObject(), token }));
});

AuthRoute.post("/register", async (req, res) => {
  const { value, error } = AuthRegisterPayloadSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const validation = error.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});
    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const email = value.email;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json(response.error({}, "email taken"));
    return;
  }

  const password = await bcrypt.hash(value.password, 10);
  const user = new User({ email, password });
  await user.save();

  res.json(response.success({}, "Register success"));
});

export default AuthRoute;

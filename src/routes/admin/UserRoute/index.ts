import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserRole } from "qhunt-lib/models/UserModel";
import { UserService } from "qhunt-lib/services";
import { UserListQueryValidator } from "qhunt-lib/validators/UserValidator";

const path = {
  list: "/list",
  detail: "/detail/:id",
  // update: "/update/:id",
} as const;

const UserRoute = Router();

UserRoute.use(AuthMiddleware);

UserRoute.get(
  path.list,
  ValidationMiddleware({ query: UserListQueryValidator }),
  async (req, res) => {
    const { value } = UserListQueryValidator.validate(req.query);

    const data = await UserService.list({ ...value, role: UserRole.Public });

    res.json(response.success(data));
  }
);

export default UserRoute;

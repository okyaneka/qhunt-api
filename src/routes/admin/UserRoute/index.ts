import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserRole } from "qhunt-lib";
import { UserService } from "qhunt-lib/services";
import { UserListParamsValidator } from "~/validators/user";

const path = {
  list: "/list",
  detail: "/:id/detail",
  // update: "/update/:id",
} as const;

const UserRoute = Router();

UserRoute.use(AuthMiddleware);

UserRoute.get(
  path.list,
  ValidationMiddleware({ query: UserListParamsValidator }),
  async (req, res) => {
    const { value } = UserListParamsValidator.validate(req.query);

    const data = await UserService.list({ ...value, role: UserRole.Public });

    res.json(response.success(data));
  }
);

export default UserRoute;

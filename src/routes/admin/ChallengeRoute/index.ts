import { response } from "qhunt-lib/helpers";
import { Router } from "express";
import { AuthMiddleware, ValidationMiddleware } from "~/middlewares";
import { ChallengeService, TriviaService } from "qhunt-lib/services";
import { ChallengeType } from "qhunt-lib/models/ChallengeModel";
import { ChallengeListParamsValidator } from "qhunt-lib/validators/ChallengeValidator";
import { TriviaItemsPayloadValidator } from "qhunt-lib/validators/TriviaValidator";

const path = {
  list: "/list",
  create: "/create",
  detail: "/detail/:id",
  detailContent: "/detail/:id/content",
  update: "/update/:id",
  updateContent: "/update/:id/content",
  delete: "/delete/:id",
} as const;

const ChallengeRoute = Router();

ChallengeRoute.use(AuthMiddleware);

ChallengeRoute.get(
  path.list,
  ValidationMiddleware({ query: ChallengeListParamsValidator }),
  async (req, res) => {
    const { value: params } = ChallengeListParamsValidator.validate(req.query);

    const data = await ChallengeService.list(params);

    res.json(response.success(data));
  }
);

// ChallengeRoute.post(
//   path.create,
//   ValidationMiddleware({ body: ChallengePayloadValidator }),
//   async (req, res) => {
//     const { value } = ChallengePayloadValidator.validate(req.body);

//     const item = await ChallengeService.create(value).catch(
//       (err: Error) => err
//     );

//     if (item instanceof Error) {
//       res.status(400).json(response.error(item.message));
//       return;
//     }

//     res.json(response.success(item));
//   }
// );

// ChallengeRoute.get(path.detail, async (req, res) => {
//   const id = req.params.id;

//   const item = await ChallengeService.detail(id).catch((err: Error) => err);
//   if (item instanceof Error) {
//     res.status(400).json(response.error(item.message));
//     return;
//   }

//   res.json(response.success(item));
// });

ChallengeRoute.get(path.detailContent, async (req, res) => {
  const id = req.params.id;

  const item = await ChallengeService.detail(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error(item.message));
    return;
  }

  switch (item.settings.type) {
    case ChallengeType.Trivia:
      const triviaContent = await TriviaService.content(item);
      res.json(response.success(triviaContent));
      return;
    default:
      res.json();
      return;
  }
});

// ChallengeRoute.put(
//   path.update,
//   ValidationMiddleware({ body: ChallengePayloadValidator }),
//   async (req, res) => {
//     const { value } = ChallengePayloadValidator.validate(req.body);

//     const id = req.params.id;

//     const item = await ChallengeService.update(id, value).catch(
//       (err: Error) => err
//     );

//     if (item instanceof Error) {
//       res.status(400).json(response.error(item.message));
//       return;
//     }

//     res.json(response.success(item));
//   }
// );

ChallengeRoute.put(path.updateContent, async (req, res, next) => {
  const id = req.params.id;

  const item = await ChallengeService.detail(id).catch((err: Error) => err);
  if (item instanceof Error) return next(item);

  switch (item.settings.type) {
    case ChallengeType.Trivia:
      const { value: triviaValue, error: triviaError } =
        TriviaItemsPayloadValidator.validate(req.body, { abortEarly: false });

      if (triviaError) {
        res.status(400).json(response.errorValidation(triviaError));
        return;
      }

      const trivias = await TriviaService.sync(item, triviaValue.items).catch(
        (err: Error) => err
      );
      if (trivias instanceof Error) return next(trivias);
      break;

    default:
      break;
  }

  res.json(response.success("content synced"));
});

ChallengeRoute.delete(path.delete, async (req, res) => {
  const id = req.params.id;

  const item = await ChallengeService.delete(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success("item deleted"));
});

export default ChallengeRoute;

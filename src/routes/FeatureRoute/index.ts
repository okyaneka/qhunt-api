import { Router } from "express";
import {
  FeatureList,
  FeaturePublished,
} from "qhunt-lib/services/feature-service";
import { handler } from "~/helpers";

const path = {
  list: "/list",
  published: "/:type/:slug",
} as const;

const FeatureRoute = Router();

FeatureRoute.get(
  path.list,
  handler(async (req, res) => {
    const items = await FeatureList(req.query);
    return items;
  })
);

FeatureRoute.get(
  path.published,
  handler(async (req, res) => {
    const { type, slug } = req.params;
    const item = await FeaturePublished(type, slug);
    return item;
  })
);

export default FeatureRoute;

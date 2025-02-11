import express from "express";
import { ErrorMiddleware, LogMiddleware } from "~/middlewares";
import routes from "~/routes";
import plugins from "./plugins";
import { env } from "./configs";
import { response } from "qhunt-lib/helpers";

const app = express();
const port = env.PORT;

plugins(app);

app.use(LogMiddleware);

routes(app);

app.get("/", (req, res) => {
  res.json(response.success("QHunt API"));
});

app.use((req, res) => {
  res.status(404).send(response.error(null, "route not found", 404));
});

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

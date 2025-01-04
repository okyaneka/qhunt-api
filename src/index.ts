import express from "express";
import { ENV, mongodb } from "~/configs";
import { ErrorMiddleware, LogMiddleware } from "~/middlewares";
import routes from "~/routes";
import response from "~/helpers/response";
import plugins from "./plugins";

const app = express();
const port = ENV.PORT;

mongodb();

app.use(LogMiddleware);

plugins(app);
routes(app);

app.get("/", (req, res) => {
  res.json(response.success("QHunt API"));
});

app.use((req, res) => {
  res.status(404).send(response.error(null, "Route not found", 404));
});

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

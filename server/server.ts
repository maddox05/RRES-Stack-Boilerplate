import express, { type Request, Response, NextFunction } from "express";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/route_list";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  morgan(
    `[:date[clf]] :method :url :status :response-time ms - :res[content-length]`
  )
);

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 min
    limit: 150, // small but prob good
  })
);

app.use("/api", router);

app.get("/*", (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
}); // for dev only

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

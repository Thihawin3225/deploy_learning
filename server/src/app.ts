import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import todoRoute from "./routes/todo.js";
import cors from "cors";

const app = express();
dotenv.config({
  path: ".env",
});
app.use(
  cors({
    origin: "https://deploy-learning-70yjq1cb7-msq5.vercel.app",
  }),
);
console.log("CLIENT_URI:", process.env.CLIENT_URI);

app.use(express.json());

const PORT = process.env.PORT || "4000";

app.use(todoRoute);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running at " + PORT);
    });
  })
  .catch((error) => {
    console.log("app.ts Error");
  });

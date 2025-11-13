import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import multer from "multer";
import path from "path";


const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//multer
app.use("/uploads", express.static("uploads"));


app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.use("/api", route);
    app.use("/uploads", express.static("uploads"));

    app.listen(PORT, () => {
      console.log(`SERVER RUNNING : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

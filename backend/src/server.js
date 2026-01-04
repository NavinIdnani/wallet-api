// const express=require("express");
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(rateLimiter);
app.use(express.json());



// const allowedOrigins = ["http://192.168.0.101"];
// app.use(cors({
//   origin: allowedOrigins,
// }));

const allowedOrigins = "*";
app.use(cors({
  origin: allowedOrigins,
}));



const PORT = process.env.PORT || 5000;



// app.get("/", (req, res) => {
//   res.send("its working okkk woww");
// });

app.use("/api/transactions",transactionsRoute);

initDB().then(() => {
  app.listen(PORT,"0.0.0.0", () => {
    console.log("Server is running on port:", PORT);
  });
});

// const express=require("express");
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import cors from "cors";
dotenv.config();

const app = express();




// const allowedOrigins = ["http://192.168.0.105"];
// app.use(cors({
//   origin: allowedOrigins,
// }));



app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // allow all for now
  },
  credentials: true,
}));



app.use(express.json());
app.use("/api",rateLimiter);


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

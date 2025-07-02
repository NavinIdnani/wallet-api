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



const allowedOrigins = ["http://localhost:8081", "http://localhost:3000","http://192.168.0.101:5000/api"];
app.use(cors({
  origin: allowedOrigins,
}));



const PORT = process.env.PORT || 5000;



// app.get("/", (req, res) => {
//   res.send("its working okkk woww");
// });

app.use("/api/transactions",transactionsRoute);

// app.get("/api/transactions/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("User ID:", userId);

//     const transactions = await sql`
//             SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
//         `;

//     res.status(200).json(transactions);
//   } catch (err) {
//     console.log("Error getting the transactions", err);
//     res.status(500).json({ message: "Internl server error" });
//   }
// });

// app.post("/api/transactions", async (req, res) => {
//   try {
//     const { title, amount, category, user_id } = req.body;

//     if (!title || !amount || !category || !amount === undefined) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const transaction = await sql`
//             INSERT INTO transactions(user_id,title,amount,category)
//             VALUES(${user_id}, ${title}, ${amount}, ${category})
//             RETURNING *
//             `;
//     console.log(transaction);
//     res.status(201).json(transaction[0]);
//   } catch (err) {
//     console.error("Error creating transaction:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.delete("/api/transactions/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (isNaN(parseInt(id))) {
//       return res.status(400).json({ message: "Invalid transaction ID" });
//     }
//     const result = await sql`
//             DELETE FROM transactions WHERE id=${id} RETURNING *
//         `;

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Transaction not found" });
//     } else {
//       res.status(200).json({ message: "Transaction deleted successfully" });
//     }
//   } catch (err) {
//     console.error("Error deleting transaction:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/transactions/summary/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("User ID for summary:", userId);

//     console.log("Running balance query...");
//     const balanceResult = await sql`
//             SELECT COALESCE(SUM(amount),0) AS balance 
//             FROM transactions 
//             WHERE user_id = ${userId} 
//         `;

//     console.log("Running income query...");
//     const incomeResult = await sql`
//             SELECT COALESCE(SUM(amount), 0) AS income
//             FROM transactions
//             WHERE user_id = ${userId} AND amount > 0
//         `;

//     console.log("Running balance query...");
//     const expensesResult = await sql`
//             SELECT COALESCE(SUM(amount), 0) AS expenses
//             FROM transactions
//             WHERE user_id = ${userId} AND amount < 0
//         `;

//     console.log("Query results:", {
//       balance: balanceResult[0].balance,
//       income: incomeResult[0].income,
//       expense: expensesResult[0].expenses,
//     });

//     res.status(200).json({
//       balance: balanceResult[0].balance,
//       income: incomeResult[0].income,
//       expense: expensesResult[0].expenses,
//     });
//   } catch (err) {
//     console.error("Error getting transaction summary:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

initDB().then(() => {
  app.listen(PORT,"0.0.0.0", () => {
    console.log("Server is running on port:", PORT);
  });
});

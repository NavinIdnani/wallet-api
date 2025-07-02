import {sql,initDB} from "../config/db.js";

export async function getTransactionsByUserID(req,res){

        try {
          const { userId } = req.params;
          console.log("User ID:", userId);
      
          const transactions = await sql`
                  SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
              `;
      
          res.status(200).json(transactions);
        } catch (err) {
          console.log("Error getting the transactions", err);
          res.status(500).json({ message: "Internl server error" });
        }
}


export async function createTransaction(req, res) {
        try {
          const { title, amount, category, user_id } = req.body;
      
          if (!title || !amount || !category || !amount === undefined) {
            return res.status(400).json({ message: "All fields are required" });
          }
          const transaction = await sql`
                  INSERT INTO transactions(user_id,title,amount,category)
                  VALUES(${user_id}, ${title}, ${amount}, ${category})
                  RETURNING *
                  `;
          console.log(transaction);
          res.status(201).json(transaction[0]);
        } catch (err) {
          console.error("Error creating transaction:", err);
          res.status(500).json({ message: "Internal server error" });
        }
}

export async function deleteTransaction(req, res){
        try {
          const { id } = req.params;
      
          if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" });
          }
          const result = await sql`
                  DELETE FROM transactions WHERE id=${id} RETURNING *
              `;
      
          if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
          } else {
            res.status(200).json({ message: "Transaction deleted successfully" });
          }
        } catch (err) {
          console.error("Error deleting transaction:", err);
          res.status(500).json({ message: "Internal server error" });
        }
}

export async function getSummaryByUserId (req, res){
    try {
      const { userId } = req.params;
      console.log("User ID for summary:", userId);
  
      console.log("Running balance query...");
      const balanceResult = await sql`
              SELECT COALESCE(SUM(amount),0) AS balance 
              FROM transactions 
              WHERE user_id = ${userId} 
          `;
  
      console.log("Running income query...");
      const incomeResult = await sql`
              SELECT COALESCE(SUM(amount), 0) AS income
              FROM transactions
              WHERE user_id = ${userId} AND amount > 0
          `;
  
      console.log("Running balance query...");
      const expensesResult = await sql`
              SELECT COALESCE(SUM(amount), 0) AS expenses
              FROM transactions
              WHERE user_id = ${userId} AND amount < 0
          `;
  
      console.log("Query results:", {
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expenses: expensesResult[0].expenses,
      });
  
      res.status(200).json({
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expenses: expensesResult[0].expenses,
      });
    } catch (err) {
      console.error("Error getting transaction summary:", err);
      res.status(500).json({ message: "Internal server error" });
    }
}


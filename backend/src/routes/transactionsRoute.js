import express from "express";
import { getSummaryByUserId,deleteTransaction,createTransaction, getTransactionsByUserID } from "../controllers/transactionsController.js";

const router=express.Router();

router.get("/:userId", getTransactionsByUserID);
  
router.post("/", createTransaction);
  
router.delete("/:id", deleteTransaction);
  
router.get("/summary/:userId", getSummaryByUserId);



export default router;
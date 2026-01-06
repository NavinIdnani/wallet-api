//new updated code 
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../constants/api";

export const useTransactions = () => {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;

    try {
      console.log("Fetching transactions for userId:", userId);

      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();

      setTransactions(data);
    } catch (err) {
      console.log("Error fetching transactions:", err);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) return;

    try {
      console.log("Fetching summary for userId:", userId);

      const response = await fetch(
        `${API_URL}/transactions/summary/${userId}`
      );
      const data = await response.json();

      setSummary(data);
    } catch (err) {
      console.log("Error fetching summary:", err);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!isLoaded || !userId) return;

    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, isLoaded, userId]);


const deleteTransactions = async(id)=>{
    try{
        const response=await fetch(`${API_URL}/transactions/${id}`,{method:"DELETE"});
        if(!response.ok) throw new Error("Failed to delete transactions");

        loadData();
        Alert.alert("Success","Transaction deleted succesfully");
    }catch(err){
        console.log("Error deleting transactions",err);
        Alert.alert("Error",err.message);
    }
};
    return {transactions,summary,isLoading,loadData,deleteTransactions};
};

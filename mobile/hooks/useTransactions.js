import { useCallback, useState } from "react";
import { Alert } from "react-native";
import {API_URL} from "../constants/api";
//const API_URL="http://localhost:5000/api";
//const API_URL="http://192.168.0.100:5000/api";


export const useTransactions=(userId)=>{
    const [transactions,setTransactions]=useState([]);

    const [summary,setSummary]=useState({
        balance:0,
        income:0,
        expenses:0,
    });


    //useCallBack used for performance reasons it'll memoixe the function
    const [isLoading,setIsLoading]=useState(true);
   
    const fetchTransactions = useCallback(async ()=>{
        try{    
            const response=await fetch(`${API_URL}/transactions/${userId}`);
            const data=await response.json();

            console.log("Fetching transactions for userId:",userId);
            setTransactions(data);
            console.log("API data summary:",data)

        }catch(err){
            console.log("Error fetchng transactions:",err);

        }

},[userId]);
 
    const fetchSummary = useCallback(async ()=>{
        try{    
            const response=await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data=await response.json();
            
            console.log("Fetching summary for userId:",userId);
            setSummary(data);
            console.log("API data summary:",data);

        }catch(err){
            console.log("Error fetchng transactions:",err);
        }

},[userId]);


const loadData = useCallback(async()=>{
    if(!userId) return;
    
    setIsLoading(true);
    try{
        await Promise.all([fetchTransactions(),fetchSummary()]);

    }catch(err){
        console.error("Error loading data:",err)
    }finally{
        setIsLoading(false);
    }

},[fetchTransactions,fetchSummary,userId]);


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
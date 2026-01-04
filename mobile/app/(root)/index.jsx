import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { FlatList, RefreshControl, Text,TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TransactionItem } from "../../components/TransactionItem";
import  NoTransactionsFound  from "../../components/NoTransactionsFound";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Image } from "react-native";
import { BalanceCard } from "../../components/BalanceCard";
import { Alert } from "react-native";


export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing,setRefreshing]=useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransactions } =
    useTransactions(user.id);


  const OnRefresh= async()=>{
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }
  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id, loadData]);

  const handleDelete=(id)=>{
     Alert.alert("Delete Transactions","Are you sure you want to delete this transactions",[
      {text:"Cancel",style:"cancel"},
      {text:"Delete",style:"destructive",onPress:()=>deleteTransactions(id)},
    ]);
  } 

  if (isLoading && !refreshing) return <PageLoader />;

  console.log("userId", user.id);
  console.log("transactions:", transactions);
  console.log("summary:", summary);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.usernameText}>
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </Text>
          </View>

          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList 
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({item})=>(
          <TransactionItem item={item} 
          onDelete={handleDelete}/>
        )}
        ListEmptyComponent={<NoTransactionsFound/>}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={OnRefresh}/>}
      />



    </View>


  );
}

import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import {Text,TouchableOpacity,View} from "react-native";
import {COLORS} from "../constants/colors";
import { useRouter } from "expo-router";

const NoTransactionsFound=()=>{
    const router = useRouter();
    return(
        <View style={styles.emptyState}>
            <Ionicons
            name="receipt-outline"
            size={60}
            color={COLORS.textLight}
            style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>No Transactions yet</Text>
            <Text style={styles.emptyStateText}>
                Start tracking your finances by adding your first transactions
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={()=>router.push("/create")} >
                <Ionicons name="add" size={18} color={COLORS.white}/>
                <Text style={styles.emptyStateButtonText}>Add Transactions</Text>
            </TouchableOpacity>
        </View>
    );
}
export default NoTransactionsFound;
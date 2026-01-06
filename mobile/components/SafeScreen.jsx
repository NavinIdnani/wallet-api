import { View} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {COLORS} from "@/constants/colors";
import { Platform } from "react-native";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
       paddingTop: Platform.OS === "web" ? 0 : insets.top,
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;

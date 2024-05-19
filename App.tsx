import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import GlobalPopup from "./components/GlobalPopup";
import PopupController from "./utils/popupController";
import Main from "./Main";
import { useState } from "react";

export default function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (_, query) => {
        PopupController.showGlobalPopup(query.queryKey);
      },
    }),
  });

  const [loadMain, setLoadMain] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <GlobalPopup />
        <Button
          title="Make failed API call"
          onPress={() => setLoadMain(true)}
        />
        {loadMain && <Main />}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

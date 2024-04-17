import React from "react";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

const PaymentScreen = () => {
  const data = useLocalSearchParams();

  return <WebView source={{ uri: `${data.url}` }} style={{ flex: 1 }} />;
};

export default PaymentScreen;

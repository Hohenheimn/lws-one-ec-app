import React from "react";
import { Slot } from "expo-router";

import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;

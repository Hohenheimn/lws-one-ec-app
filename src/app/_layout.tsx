import React from "react";
import { Slot } from "expo-router";

import { SessionProvider } from "@/context/AuthContext";

const RootLayout = () => {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};

export default RootLayout;

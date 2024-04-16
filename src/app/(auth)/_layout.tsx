import React from "react";
import { Redirect, Slot } from "expo-router";

import { retrieveData } from "@/src/helpers";

const AuthLayout = () => {
  const userToken = retrieveData("userToken");
  if (!userToken) {
    return <Redirect href="/" />;
  }
  return <Slot />;
};

export default AuthLayout;

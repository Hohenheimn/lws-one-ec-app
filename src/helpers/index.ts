import * as SecureStore from "expo-secure-store";

export const storedData = async (name: string, value: string) => {
  try {
    await SecureStore.setItemAsync(name, value);
    console.log("Data stored successfully");
  } catch (error) {
    console.error("Failed to stored data:", error);
  }
};

export const retrieveData = (name: string) => {
  try {
    const value = SecureStore.getItem(name);
    return value;
  } catch (error) {
    console.error("Failed to retrieve data:", error);
  }
};

export const removeData = async (name: string) => {
  try {
    await SecureStore.deleteItemAsync(name);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Failed to remove data:", error);
  }
};

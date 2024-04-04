import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(name);
    return value;
  } catch (error) {
    console.log("error in getData", error);
  }
};

export const setData = async (name: string, token: string) => {
  try {
    await AsyncStorage.setItem(name, token);
  } catch (error) {
    console.log("error in setToken", error);
  }
};

export const removeData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    console.log("error in removeData", error);
  }
};

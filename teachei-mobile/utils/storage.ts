import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const TOKEN_KEY = "teachei_auth_token";
const USER_KEY = "teachei_user";
const ROLE_KEY = "teachei_user_role";

// Use SecureStore on native, AsyncStorage on web
const isWeb = Platform.OS === "web";

export async function saveToken(token: string): Promise<void> {
  if (isWeb) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export async function getToken(): Promise<string | null> {
  if (isWeb) {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
}

export async function removeToken(): Promise<void> {
  if (isWeb) {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

export async function saveUser(user: object): Promise<void> {
  const userString = JSON.stringify(user);
  if (isWeb) {
    await AsyncStorage.setItem(USER_KEY, userString);
  } else {
    await SecureStore.setItemAsync(USER_KEY, userString);
  }
}

export async function getUser(): Promise<object | null> {
  let userString: string | null;
  if (isWeb) {
    userString = await AsyncStorage.getItem(USER_KEY);
  } else {
    userString = await SecureStore.getItemAsync(USER_KEY);
  }
  return userString ? JSON.parse(userString) : null;
}

export async function removeUser(): Promise<void> {
  if (isWeb) {
    await AsyncStorage.removeItem(USER_KEY);
  } else {
    await SecureStore.deleteItemAsync(USER_KEY);
  }
}

export async function saveRole(role: string): Promise<void> {
  if (isWeb) {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } else {
    await SecureStore.setItemAsync(ROLE_KEY, role);
  }
}

export async function getRole(): Promise<string | null> {
  if (isWeb) {
    return await AsyncStorage.getItem(ROLE_KEY);
  } else {
    return await SecureStore.getItemAsync(ROLE_KEY);
  }
}

export async function clearAllStorage(): Promise<void> {
  await removeToken();
  await removeUser();
  if (isWeb) {
    await AsyncStorage.removeItem(ROLE_KEY);
  } else {
    await SecureStore.deleteItemAsync(ROLE_KEY);
  }
}




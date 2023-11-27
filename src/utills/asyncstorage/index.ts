import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (req: any) => {
  try {
    const res = await AsyncStorage.getItem(req);
    return res ? JSON.parse(res) : null;
  } catch (error) {
    console.trace(error);
  }
};

export const removeItem = async (req: any) => {
  try {
    await AsyncStorage.removeItem(req);
  } catch (error) {
    console.trace(error);
  }
};

export const clearLocalStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) { }
};

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.trace(error);
  }
};

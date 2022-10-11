import AsyncStorage from "@react-native-async-storage/async-storage";

async function put(key: string, value: any): Promise<void> {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
}

async function get<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);

    if (value == null) {
        return null;
    }
    return JSON.parse(value) as T;
}

async function remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
}

export default {
    put,
    get,
    remove,
};

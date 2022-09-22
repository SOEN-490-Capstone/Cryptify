import AsyncStorage from "@react-native-async-storage/async-storage";

async function put(key: string, value: any): Promise<void> {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
}

async function get<T>(key: string): Promise<T> {
    const value = await AsyncStorage.getItem(key);

    if (value == null) {
        throw new Error(`No value found at ${key}`);
    }
    return JSON.parse(value) as T;
}

export default {
    put,
    get,
};

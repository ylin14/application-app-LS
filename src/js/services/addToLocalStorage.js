import {getFromLocalStorage} from "./getFromLocalStorage.js";
import {goodsCounter} from "./models.js";


export function addToLocalStorage (key, value) {
    let storage = value;
    if (Array.isArray(value)) {
        storage = getFromLocalStorage(key)
        if (storage) {
            storage.push(...value)
        } else {
            storage = [...value];
        }
        storage = goodsCounter(storage);
    }

    const stringifiedValue = JSON.stringify(storage);
    localStorage.setItem(key, stringifiedValue);
}


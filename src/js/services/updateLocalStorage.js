import localStorage from "./index.js";
export function updateLocalStorage (key, arr) {
    localStorage.deleteFromLocalStorage(key);
    localStorage.addToLocalStorage(key, arr);
}
export function getFromLocalStorage (key) {
    const values = localStorage.getItem(key);
    return JSON.parse(values);
}
export function saveToStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}
export function getFromStorage(key, defaultKey) {
    if (localStorage.getItem(key) === null) return defaultKey;
    return JSON.parse(localStorage.getItem(key));
}

export function removeFromStorage(key) {
    return localStorage.removeItem(key)
}

export function clearStorage() {
    return localStorage.clear()
}
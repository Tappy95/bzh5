

export function getSession(name) {
    return window.sessionStorage.getItem(name);
}
export function setSession(name,value) {
    window.sessionStorage.setItem(name, value);
}
export function delSession(name) {
    window.sessionStorage.removeItem(name)
}
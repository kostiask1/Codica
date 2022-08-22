export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const getStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "[]")

export const setStorage = (key: string, payload: any) =>
  localStorage.setItem(key, JSON.stringify(payload))

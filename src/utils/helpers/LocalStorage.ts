export function setItem(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
}

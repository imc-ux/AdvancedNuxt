import { defaultTheme } from '../constant/commonConstant';

export function deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export function getLocalStorage() {
  return window.localStorage;
}

export function getCurrentTheme() {
  return window.localStorage?.theme ?? defaultTheme;
}

export function initialTheme() {
  const currentTheme = getCurrentTheme();
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
}

import routes from "routes/routes";

const USER_STORAGE_KEY = "user";
const USER_TOKEN_STORAGE_KEY = "userToken";

const saveData = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data));

const getData = (key: string) => JSON.parse(localStorage.getItem(key)!);

export const currentUser = () => getData(USER_STORAGE_KEY);

export const setCurrentUser = (vendor: any) =>
  saveData(USER_STORAGE_KEY, vendor);

export const removeCurrentUser = () =>
  localStorage.removeItem(USER_STORAGE_KEY);

export const currentUserAuthToken = () => getData(USER_TOKEN_STORAGE_KEY);

export const setCurrentUserAuthToken = (token: string) =>
  saveData(USER_TOKEN_STORAGE_KEY, token);

export const removeCurrentUserAuthToken = () =>
  localStorage.removeItem(USER_TOKEN_STORAGE_KEY);

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
  window.location.replace(routes.login);
};

export { USER_STORAGE_KEY, USER_TOKEN_STORAGE_KEY };

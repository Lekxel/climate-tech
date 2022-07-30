import { toast } from "react-toastify";

export const removeFalsyValues = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (!newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string) => password.length >= 6;

export const showSuccess = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const showDanger = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

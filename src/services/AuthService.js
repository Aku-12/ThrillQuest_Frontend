import { loginUserApi, registerUserApi } from "../api/authApi";

export const registerService = async (formData) => {
  const response = await registerUserApi(formData);
  return response.data;
};

export const loginService = async (formData) => {
  const response = await loginUserApi(formData);
  return response.data;
};

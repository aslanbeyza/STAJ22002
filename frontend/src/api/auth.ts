/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/auth.ts
import axiosInstance from "./axiosInstance";

// Register fonksiyonu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (formData: any) => {
  const response = await axiosInstance.post("/auth/register", formData);
  console.log("registerUser",response.data);
  return response.data;
};

// Login fonksiyonu (email ve password gönderimi yapılıyor)
export const loginUser = async (formData: any) => {
  const response = await axiosInstance.post("/auth/login", {
    username: formData.email, // username yerine email kullanıyoruz
    password: formData.password,
    api_key: formData.api_key, // API anahtarı
  });
  console.log("loginUser",response.data);
  return response.data;
};

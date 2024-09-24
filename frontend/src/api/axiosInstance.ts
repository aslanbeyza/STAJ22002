// src/api/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://fe1111.projects.academy.onlyjs.com/api/v1", // Base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Access token al
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Token'ı header'a ekle
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Eğer token süresi dolmuşsa (401 hatası)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken"); // Refresh token al

      // API'ye refresh token ile yeni access token almak için istek at
      try {
        const response = await axios.post(
          "https://fe1111.projects.academy.onlyjs.com/api/v1/auth/token/refresh", 
          { token: refreshToken }
        );

        const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;

        // Yeni token'ları Cookies'e kaydet
        Cookies.set("accessToken", newAccessToken);
        Cookies.set("refreshToken", newRefreshToken);

        // Orijinal isteği yeni token ile tekrar dene
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token yenileme hatası:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login"; // Giriş sayfasına yönlendir
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

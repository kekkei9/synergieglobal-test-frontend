import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/AuthConstants";

export const axiosConfigs = { redirectOn401: true };

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const refreshAccessToken = async () => {
  const { data: refreshResult } = await axiosClient.post("/api/auth/refresh", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
    },
  });
  localStorage.setItem(ACCESS_TOKEN, refreshResult.accessToken || "");
  return refreshResult.accessToken;
};

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error?.response?.status === 401) {
      try {
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return axiosClient(originalConfig);
      } catch (error) {
        if (originalConfig.redirectOn401) {
          //if refresh token expired: redirect to login & clear local storage
          localStorage.removeItem(REFRESH_TOKEN);
          localStorage.removeItem(ACCESS_TOKEN);
          const urlSearchParams = new URLSearchParams(window.location.search);
          const redirectUrl =
            urlSearchParams.get("redirect") || window.location.href;
          window.location.href = `/auth/signin?redirect=${encodeURIComponent(
            redirectUrl
          )}`;
          // Add redirect action to session storage
          originalConfig.redirectAction &&
            sessionStorage.setItem(
              "redirectAction",
              originalConfig.redirectAction
            );
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = async (url: string, options: AxiosRequestConfig<any>) =>
  axiosClient.get(url, { ...axiosConfigs, ...options }).then((res) => res.data);

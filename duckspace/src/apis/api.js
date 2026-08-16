import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

// 요청할 때 accessToken 자동으로 붙이기
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            originalRequest.url !== "/api/auth/login" &&
            originalRequest.url !== "/api/auth/refresh"
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                clearTokens();
                moveToLogin();
                return Promise.reject(error);
            }

            try {
                if (!refreshPromise) {
                    refreshPromise = axios
                        .post(`${BASE_URL}/api/auth/refresh`, {
                            refreshToken,
                        })
                        .then((response) => {
                            const {
                                accessToken,
                                refreshToken: newRefreshToken,
                            } = response.data.data;
                        // 백엔드가 refreshToken도 새로 발급하므로 둘 다 교체
                            localStorage.setItem(
                                "accessToken",
                                accessToken
                            );
                            localStorage.setItem(
                                "refreshToken",
                                newRefreshToken
                            );
                            return accessToken;
                        })
                        .finally(() => {
                            refreshPromise = null;
                        });
                    }

                    const newAccessToken = await refreshPromise;
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    clearTokens();
                    moveToLogin();
                    return Promise.reject(refreshError);
                }
            }
             return Promise.reject(error);
        }
);

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function moveToLogin() {
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

export default api;
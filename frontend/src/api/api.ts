import axios from "axios";

const API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:8000/api"
  : "https://kodzuken.pythonanywhere.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access");

//   if (token && token !== "undefined" && token !== "null") {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


api.interceptors.request.use((config) => {
  const publicEndpoints = ["/auth/login/", "/auth/register/", "/products/", "/categories/"];
  const isPublic = publicEndpoints.some((endpoint) => config.url?.includes(endpoint));

  if (isPublic) return config;

    const token = localStorage.getItem("access");
    console.log("🔐 Токен в запросе:", token ? "есть" : "НЕТ", config.url);
  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(`${API_URL}/token/refresh/`, {
          refresh,
        });

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
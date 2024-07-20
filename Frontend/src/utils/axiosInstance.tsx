import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
  withCredentials: true,
});

//Adding interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const orginalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      orginalRequest.url !== "/refersh_token"
    ) {
      try {
        // Call the refresh token endpoint
        const user_name = userStoreInstance?.user?.user_name;

        const response = await axiosInstance
          .post("/refresh_token", { user_name })
          .then((res) => {
            if (res.status === 200) {
              return axiosInstance.request(orginalRequest);
            }
          })
          .catch((err) => {
            console.error("Error refreshing token", err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export default axiosInstance;

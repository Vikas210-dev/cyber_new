import {
  isAuthenticated,
  isUserTokenValid,
  clearAuthData,
} from "./authservice";
import { useToast } from "@/hooks/use-toast";
export function attachInterceptors(instance, getToken, withRedirect = true) {
  const { toast } = useToast();
  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log("Request interceptor is working!", config.url);

      // Get the current path
      const currentPath = window.location.pathname;

      // Define public routes that don't require authentication
      const publicRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/",
        "/home",
      ];
      const isPublicRoute = publicRoutes.includes(currentPath);

      if (!isPublicRoute && withRedirect) {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          console.warn("User not authenticated, redirecting to login");
          clearAuthData();
          window.location.href = "/login";
          return Promise.reject(new Error("Authentication required"));
        }
      }

      // Add token to API requests
      const token = getToken();
      if (token && !config.url?.includes("token")) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log(
        "Response interceptor is working!",
        response.status,
        response.config.url
      );
      return response;
    },
    (error) => {
      console.log("Error Interceptor Triggered", error.response?.status);

      const currentPath = window.location.pathname;
      const publicRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/",
        "/home",
      ];
      const isPublicRoute = publicRoutes.includes(currentPath);

      if (!error.response || error.response.status === 0) {
        console.error("Network error detected");

        if (!isPublicRoute && !isAuthenticated()) {
          clearAuthData();
          window.location.href = "/login";
        }
      } else {
        const status = error.response.status;

        switch (status) {
          case 401:
            console.warn("401 Unauthorized - redirecting to login");
            clearAuthData();
            if (!isPublicRoute) {
              window.location.href = "/login";
            }
            break;

          case 260:
            console.warn("Custom error 260:", error.response.data);
            const status = error.response?.status;
            const message =
              error.response?.data?.message || "Something went wrong.";
            toast({
              title: `Error ${status}`,
              description: message,
              variant: "error",
            });
            break;

          default:
            console.error(`HTTP Error ${status}:`, error.response.data);
        }
      }

      return Promise.reject(error);
    }
  );
}

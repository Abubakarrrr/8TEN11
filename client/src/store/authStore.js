import { create } from "zustand";
import axios from "axios";

// const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;
const API_URL = `http://localhost:5000/api/auth`;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  allUsers: [],

  setUser: (user) => {
    set({ user });
  },

  signup: async (email, name, password, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        role,
      });
      set({
        user: response?.data?.user,
        isAthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error singing up",
      });
      throw error;
    }
  },
  loginWithGoogle: async (googleUser) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login-with-google`, {
        googleUser,
      });
      set({ user: response.data.user, isAthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error while logging in with Google",
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log(response);
      set({ user: response.data.user, isAthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error singing up",
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAthenticated: false, isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: "Error logging out",
      });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });
      set({ user: response.data.user, isAthenticated: true, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error verifying user",
      });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        password,
        confirmPassword,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error reseting password",
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data?.user,
        isAthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        error: null,
        isAthenticated: false,
      });
      throw error;
    }
  },

  // ADMIN APIs
  // sudo_createUser: async (FormData) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.post(`${ADMIN_API_URL}/create-user`, {
  //       email: FormData.email,
  //       password: FormData.password,
  //       name: FormData.name,
  //       role: FormData.role,
  //     });
  //     set({
  //       isLoading: false,
  //     });
  //     return response?.data?.user;
  //   } catch (error) {
  //     set({
  //       isLoading: false,
  //       error: error.response?.data?.message || "Error craeting user",
  //     });
  //     throw error;
  //   }
  // },
  // sudo_updateUser: async (updateData, userId) => {
  //   set({ isLoading: true, error: null });
  //   console.log(updateData, userId);
  //   try {
  //     const response = await axios.post(
  //       `${ADMIN_API_URL}/update-user/${userId}`,
  //       updateData
  //     );
  //     set({
  //       isLoading: false,
  //     });
  //     return response?.data?.user;
  //   } catch (error) {
  //     set({
  //       isLoading: false,
  //       error: error.response?.data?.message || "Error craeting user",
  //     });
  //     throw error;
  //   }
  // },
  // sudo_getAllUsers: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axios.get(`${ADMIN_API_URL}/get-all-users`);
  //     set({
  //       allUsers: response?.data?.users,
  //       isLoading: false,
  //     });
  //     return response?.data?.users;
  //   } catch (error) {
  //     set({
  //       isLoading: false,
  //       error: error.response?.data?.message || "Error fetching users",
  //     });
  //     throw error;
  //   }
  // },
}));

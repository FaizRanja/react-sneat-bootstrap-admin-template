import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  user: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),
  isLoading: false,
  error: null,
};

// Register user action
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        userData
      );
      const { token } = response.data; // Extract the token from the response
      Cookies.set("token", token, { expires: 7 }); // Set the token in cookies (expires in 7 days)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);
// Login user action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        loginData
      );
      const { token } = response.data; // Extract the token from the response
      Cookies.set("token", token, { expires: 7 }); // Set the token in cookies (expires in 7 days)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);
// Get Secret Key action
export const SecrectKey = createAsyncThunk(
  "auth/SecrectKey",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");

    if (!token) {
      return rejectWithValue({
        message: "No token found. Please log in again.",
      });
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/Getallregisteruser",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const { secretKey, instructions } = response.data.user;
      if (!secretKey) {
        return rejectWithValue({
          message: "No secret key found for the user.",
        });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("token"); // Clear token from cookies
    },
    loadUserFromCookies: (state) => {
      const token = Cookies.get("token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred";
      })
      .addCase(SecrectKey.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SecrectKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          secretKey: action.payload.user.secretKey,
          instructions: action.payload.instruction
        };
      })
      .addCase(SecrectKey.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred";
      });
  },
});

export const { logout, loadUserFromCookies } = authSlice.actions;
export default authSlice.reducer;

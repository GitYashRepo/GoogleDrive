import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/signup", formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup failed");
  }
});

export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", formData);

    if (res.data?.token) {
      localStorage.setItem("gdtoken", res.data.token);
    }

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    localStorage.removeItem("gdtoken");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Logout failed");
  }
});

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("gdtoken") || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || state.token;
      })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;

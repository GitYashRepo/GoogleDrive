import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

// --- Async Thunks ---
export const uploadFile = createAsyncThunk("file/upload", async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("/file/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "File upload failed");
  }
});

export const fetchFiles = createAsyncThunk("file/fetch", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/file");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetching files failed");
  }
});

// --- Slice ---
const fileSlice = createSlice({
  name: "file",
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadFile.pending, (state) => { state.loading = true; })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload.file);
      })
      .addCase(uploadFile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Fetch
      .addCase(fetchFiles.pending, (state) => { state.loading = true; })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default fileSlice.reducer;

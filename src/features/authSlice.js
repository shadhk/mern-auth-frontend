import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }
);

export const fetchProtectedData = createAsyncThunk('auth/fetchProtectedData', async (_, {getState}) => {
    const state = getState()
    const response = await axios.get(`${BACKEND_URL}/protected`, {
        headers: {
            Authorization: `Bearer ${state.auth.token}`
        }
    })
    return response.data;
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProtectedData.fulfilled, (state, action) => {
          state.protectedData = action.payload
      })
  },
});

export const {logout} = authSlice.actions

export default authSlice.reducer

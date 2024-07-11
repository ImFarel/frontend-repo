import { RootState } from "@/lib/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersApiSlice } from "../users/usersApiSlice";
import { createAppSlice } from "@/lib/createAppSlice";

type LoginResponse = {
  id: string;
  email: string;
  name: string;
  token: string;
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
} as {
  user: null | User;
  token: string | null;
  isAuthenticated: boolean;
  message: string;
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logout: create.reducer(() => initialState),
    login: create.asyncThunk(
      async (
        credentials: { email: string; password: string },
        { rejectWithValue }
      ) => {
        try {
          const response = await fetch("http://localhost:9000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Login failed");
          }
          const data = await response.json();
          return data.data as LoginResponse; // Assuming the API response structure matches your example
        } catch (error) {
          return rejectWithValue(
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.message = "Success";
          console.log(action.payload)
          localStorage.setItem('token', action.payload.token)
        },
        rejected: (state) => {
          state.isAuthenticated = false;
          state.message = "Credential not found";
        },
      }
    ),
  }),
  selectors: {
    selectIsAuth: (state) => state.isAuthenticated,
    selectToken : state => state.token
  },
});

export const { logout, login } = authSlice.actions;
export const { selectIsAuth, selectToken } = authSlice.selectors;

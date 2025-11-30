import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,

  createStatus: "idle",
  createError: null,

  page : 1,
  totalPages: 1,
};
const API_KEY = 'reqres-free-v1';

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", 
  async (page = 1) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          'x-api-key': API_KEY,    
        },
      });
    if (!response.ok) {
      throw new Error("Error al obtener usuarios.");
    }
    const data = await response.json();
    return {
      items : data.data,
      page : data.page,
      totalPages : data.total_pages,
    };
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.error || "Fallo en la API al crear el usuario."
        );
      }

      const newUserData = await response.json();

      const mappedUser = {
        id: newUserData.id,
        email:
          newUserData.name.toLowerCase().replace(" ", ".") + "@example.com",
        first_name: newUserData.name.split(" ")[0] || newUserData.name,
        last_name: newUserData.name.split(" ").slice(1).join(" ") || "",
        avatar:
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      };

      return mappedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCreateStatus(state) {
      state.createStatus = "idle";
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH USERS (GET)
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al obtener usuarios";
      })

      // CASOS PARA CREAR USUARIO (POST)
      .addCase(createUser.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error.message;
      });
  },
});

export const { clearCreateStatus } = usersSlice.actions;
export default usersSlice.reducer;

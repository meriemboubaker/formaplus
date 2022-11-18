import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postNewUser = createAsyncThunk(
  "user/postNewUser",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/register", info);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error?.response?.data?.errors?.password?.msg
          ? error?.response?.data?.errors?.password?.msg
          : error?.response?.data?.errors?.username?.msg
          ? error?.response?.data?.errors?.username?.msg
          : error?.response?.data?.errors?.email?.msg
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        "/users/user",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      );
    
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", info);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/users/logout",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/users/update/${info.id}`, info.data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/updatePassword/${info.id}`,
        info.data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response.data.msg
        ? error.response.data.msg
        : error?.response?.data?.errors?.password?.msg
        ? error?.response?.data?.errors?.password?.msg:null

      );
    }
  }
);
export const updateImage = createAsyncThunk(
  "user/addnewpicture",
  async (info, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("image", info.file);
    try {
      const res = await axios.put(
        `/users/image/${info.id}`,
        formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);

export const createCredit = createAsyncThunk(
  "user/createCredit",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/users/createCredit", info);
      dispatch(getUser());

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const updateBookmarks = createAsyncThunk(
  "bookmarks/updateBookmarks",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/updateBookmarks/${info.id}`,
        info.data,
     {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const deleteBookmarks = createAsyncThunk(
  "bookmarks/deleteBookmarks",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/users/deleteBookmarks/${info.id}`,
        info.data,
     {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      );
      dispatch(getUser());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    montant: null,
    registerErrors: null,
    registerLoading: false,
    loginErrors: null,
    loading: false,
    connexionLoading: false,
    updateBookmarksErrors: null,
    updateBookmarksLoading: false,
    errors: false,
    show: null,
    showModal: null,
    updateShow:null,
    updateErrors:null,
    updateLoading:false,
    userInfo: JSON.parse(localStorage.getItem("user")),
    isAuth: Boolean(localStorage.getItem("isAuth")),
  },
 
  extraReducers: {
    [postNewUser.pending]: (state) => {
      state.loading = true;
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.loading = false;
      state.registerErrors = null;
    },
    [postNewUser.rejected]: (state, action) => {
      state.registerErrors = action.payload;
      state.loading = false;
      state.isAuth = false;
    },
    [login.pending]: (state) => {
      state.connexionLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.connexionLoading = false;
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.loginErrors = action.payload;
      state.isAuth = false;
      state.connexionLoading = false;
    },
    [getUser.pending]: (state) => {
      state.connexionLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", action.payload.isAuth);
      state.loginErrors = null;
      state.connexionLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isAuth", false);
      state.loginErrors = action.payload;
      state.connexionLoading = false;
    },
    [logout.pending]: (state) => {
      state.connexionLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.userInfo = null;
      state.isAuth = false;
      state.loginErrors = null;
      state.connexionLoading = false;
      localStorage.setItem("user", null);
      localStorage.setItem("isAuth", false);
    },
    [logout.rejected]: (state, action) => {
      state.loginErrors = action.payload;
      state.connexionLoading = false;
    },
    [updateUser.pending]: (state) => {
      state.updateLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updateErrors = null;
      state.updateShow =true
    },
    [updateUser.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
    [updatePassword.pending]: (state) => {
      state.updateLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.updateLoading = false;
      state.updateErrors = null;
      state.updateShow=true;
    },
    [updatePassword.rejected]: (state, action) => {
      state.updateErrors = action.payload;
      state.updateLoading = false;
    },
   
  },
});
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postNewUser = createAsyncThunk(
  "user/postNewUser",
  async (info, { rejectWithValue }) => {
    try {
    const res = await axios.post("/users/register", info.user);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
          ? error.response.data.msg
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
        `/users/getUser/${info}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
      
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", info);
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
   
      );
    }
  }
);
export const loginpassport = createAsyncThunk(
  "user/loginpassport",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/loginpassport", info.userInfo);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
        
      );
    }
  }
);

export const getUserPassport = createAsyncThunk(
  "user/getUserPassport",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        "/users/user",
        { withCredentials: true },
   
        
      );
     return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
      
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
        
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
        
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/users/updateUser/${info.id}`, info.data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(getUser(info.id));
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg
          
      );
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    montant: null,
    loading:false,
    errors: false,
    
    user: JSON.parse(localStorage.getItem("user")),
    isAuth: Boolean(localStorage.getItem("isAuth")),
  },
 
  extraReducers: {
    [postNewUser.pending]: (state) => {
      state.loading = true;
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.loading = false;
      state.errors = null;
    },
    [postNewUser.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
      state.isAuth = false;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.errors = null;
      state.user = action.payload.user
      state.isAuth = true
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
    },
    [login.rejected]: (state, action) => {
      state.errors = action.payload;
      state.isAuth = false;
      state.loading = false;
    },
    [loginpassport.pending]: (state) => {
      state.loading = true;
    },
    [loginpassport.fulfilled]: (state, action) => {
      state.loading = false;
      state.errors = null;
    },
    [loginpassport.rejected]: (state, action) => {
      state.errors = action.payload;
      state.isAuth = false;
      state.loading = false;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.errors = null;
      state.loading = false;
    },
    [getUser.rejected]: (state, action) => {
      localStorage.setItem("user", null);
      localStorage.setItem("token", null);
      localStorage.setItem("isAuth", false);
      state.errors = action.payload;
      state.loading = false;
    },
    [getUserPassport.pending]: (state) => {
      state.loading = true;
    },
    [getUserPassport.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", action.payload.isAuth);
      state.errors = null;
      state.connexion = false;
      state.loading = false;
    },
    [getUserPassport.rejected]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isAuth", false);
      state.errors = action.payload;
      state.connexion = false;
      state.loading = false;
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
      state.isAuth = false;
      state.errors = null;
      state.loading = false;
      localStorage.setItem("user", null);
      localStorage.setItem("isAuth", false);
    },
    [logout.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.errors = null;
   
    },
    [updateUser.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
   
   
  },
});
export default userSlice.reducer;

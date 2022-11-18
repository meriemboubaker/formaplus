import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (info, { rejectWithValue, dispatch }) => {
    
    try {
      const res = await axios.post("/products/createproduct",info,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
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
export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/getProducts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/getProduct/${info}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.delete(`/products/deleteproduct/${info.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(fetchProductList())
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
export const updateProduct = createAsyncThunk(
  'products/updateProducts',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
    formData.append("image", info.file);
    formData.append("info", JSON.stringify(info.data));
      const res = await axios.put(`/products/updateProduct/${info.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(fetchProduct(info.id));
      return res.data;
    } catch (error) {
        return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    paginateProduct:null,
    products: null,
    product:null,
    loading:null,
    errors:null
    
  },
 
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.errors = null;
    },
    [createProduct.rejected]: (state, action) => {
      state.createProductErrors = action.payload;
      state.loadingCreateProduct = false;
    },
    [fetchProductList.pending]: (state) => {
      state.loading = true;
    },
    [fetchProductList.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.errors = null;
    },
    [fetchProductList.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
   
    [fetchProduct.pending]: (state) => {
      state.loading= false;
      
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.loading= false;
      state.errors= null;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading= false;
      state.errors= action.payload;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.errors = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    [updateProduct.pending]: (state) => {
      state.loadingUpdateProduct = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.errors = null;

    },
    [updateProduct.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;

    },

  },
});

export default productSlice.reducer;

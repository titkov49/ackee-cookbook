import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipe = createAsyncThunk('item/fetchRecipe', async (id) => {
  const response = await axios.get(`recipes/${id}`);
  return response.data;
});

// export const updateRating = createAsyncThunk('item/updateRating', async (body) => {
//   console.log("BODY: ", body);
//   const response = await axios.put(`recipes/${body.id}`, JSON.stringify({ score: body.score }));
//   return response.data;
// })

const initialState = {
  status: 'idle'
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addRating: (state, action) => {
      state.recipe.rating = action.payload;
    }
  },
  extraReducers: {
    [fetchRecipe.pending]: (state) => { state.status = "loading"; },
    [fetchRecipe.fulfilled]: (state, action) => {
      state.status = "idle";
      state.recipe = action.payload;
    },
    [fetchRecipe.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error;
    },
    // [updateRating.pending]: (state) => { state.status = "loading"; },
    // [updateRating.fulfilled]: (state, action) => {
    //   state.status = "idle";
    //   state.recipe = action.payload;
    // },
    // [updateRating.rejected]: (state, action) => {
    //   state.status = "error";
    //   state.error = action.error;
    // }
  }
});

export const { addRating } = itemSlice.actions;

export default itemSlice.reducer;
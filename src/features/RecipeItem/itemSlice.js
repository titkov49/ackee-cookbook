import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipe = createAsyncThunk('item/fetchRecipe', async (id) => {
  const response = await axios.get(`recipes/${id}`);
  return response.data;
});

export const updateRecipe =  createAsyncThunk('item/updateRecipe', async (body) => {
  const response = await axios.put(`recipes/${body.id}`, body);
  return response.data;
})

export const updateRating = createAsyncThunk('item/updateRecipe', async (body) => {
  const response = await axios.post(`recipes/${body.id}/ratings`, { score : body.score });
  return response.data;
})

const pending = (state) => { state.status = "loading"; };
const rejected = (state, action) => {
  state.status = "error";
  state.error = action.error;
};
const fulfilled = (state, action) => {
  state.status = "idle";
  state.recipe = action.payload;
};

const initialState = {
  status: 'idle'
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: {
    //fetchRecipe
    [fetchRecipe.pending]: pending,
    [fetchRecipe.fulfilled]: fulfilled,
    [fetchRecipe.rejected]: rejected,
    //updateRecipe
    [updateRecipe.pending]: pending,
    [updateRecipe.fulfilled]: fulfilled,
    [updateRecipe.rejected]: rejected,
    //updateRating
    [updateRating.pending]: pending,
    [updateRating.fulfilled]: (state, action) => {
      state.recipe.score = action.payload.score;
    },
  }
});

export default itemSlice.reducer;
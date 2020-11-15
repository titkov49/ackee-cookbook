import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('list/fetchRecipes', async (offset = 0) => {
  const response = await axios.get(`recipes?limit=10&offset=${offset}`);
  return response.data;
});

export const createRecipe = createAsyncThunk('list/createRecipe', async (item) => {
  const response = await axios.post('', item);
  return response.data;
});

const pending = (state) => {
  state.status = 'loading';
};

const initialState = {
  recipes: [],
  status: 'idle'
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateItem: (state, action) => {
      let index = state.recipes.findIndex(item => item.id === action.payload.id);
      state.recipes[index] = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, pending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      })
      .addCase(createRecipe.pending, pending)
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.status = 'idle'
        state.recipes.unshift(action.payload);
        state.recipes.pop();
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

  }
})

export const { updateItem } = listSlice.actions;

export default listSlice.reducer;
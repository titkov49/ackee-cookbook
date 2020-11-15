import { configureStore } from '@reduxjs/toolkit';
import recipesListReducer from '../features/RecipesList/listSlice';
import recipeItemReducer from '../features/RecipeItem/itemSlice';

export default configureStore({
  reducer: {
    recipesList: recipesListReducer,
    recipeItem: recipeItemReducer
  },
});

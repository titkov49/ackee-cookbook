import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import List from './features/RecipesList/List';
import RecipeItem from './features/RecipeItem/RecipeItem';
import Form from './features/Form';
import './App.css';

function App() {
  const recipe = useSelector(state => state.recipeItem?.recipe);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/item">
          <RecipeItem />
        </Route>
        <Route path="/edit">
          <Form recipe={recipe}/>
        </Route>
        <Route path="/new">
        <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

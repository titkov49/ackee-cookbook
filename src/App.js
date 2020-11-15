import React from 'react';
import List from './features/RecipesList/List';
import RecipeItem from './features/RecipeItem/RecipeItem';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/item">
          <RecipeItem />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

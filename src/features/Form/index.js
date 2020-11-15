import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import Header from '../Header';
import { createRecipe, fetchRecipes } from '../RecipesList/listSlice';
import { updateRecipe } from '../RecipeItem/itemSlice';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5rem;
  text-align: left;

  h3 {
    color: blue;
  }
`;

const ErrorsContainer = styled.div`
  padding: 0.5rem;
  border: 3px solid red;
  border-radius: 10px;
  color: red;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  transition: all .1s linear;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0.5rem;
  margin-bottom: 1rem;
  outline: none;

  &:focus {
    border-bottom: 3px solid blue;
  }
`;

const Button = styled.button`
  width: 20%;
  padding: 0.5rem;
  color: violet;
  font-weight: 700;
  border: 3px solid violet;
  border-radius: 10px;
  outline: none;
  background-color: white;
  margin-bottom: 1rem;
  cursor: pointer;

  &:active {
    border: 3px solid blue;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
  height: 15%;
  padding: 0.5rem;
  resize: none;
  outline: none;

  &:focus {
    border-bottom: 3px solid blue;
  }
`;

const Ingredient = styled.div`
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Form = ({ recipe }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  
  const [item, setItem] = useState({
    name: recipe?.name || '',
    description: recipe?.description || '',
    duration: recipe?.duration || '',
    ingredients: recipe?.ingredients || [],
    info: recipe?.info || '',
  })
  const [ing, setIng] = useState('');
  const [errors, setErrors] = useState([]);

  const onChange = (prop, value) => {
    let obj = {};
    obj[prop] = value;
    setItem(prev => ({...prev, ...obj}));
  };

  const addIngredient = () => {
    if (!ing) return;
    const ingredients = [...item.ingredients];
    ingredients.push(ing);
    onChange('ingredients', ingredients);
    setIng('');
  }

  const saveRecipe = () => {
    //validation
    const errs = [];
    if (!/\b(A|a)ckee\b/.test(item.name)) errs.push('Name should contain word "ackee" or "Ackee');
    if (item.name === recipe?.name) errs.push('If you update recipe, you must create new name');
    if (!recipe) {
      if (!item.description) errs.push('Description should contain at least one word');
      if (!item.duration) errs.push('Duration should be written');
      if (!item.info) errs.push('Info should contain at least one word');
    }
    
    if (errs.length > 0) {
      setErrors(errs);
      return ;
    }
    //if everything okay
    if (location.pathname === '/edit' && recipe) {
      dispatch(updateRecipe({ id: recipe.id, ...item }));
      dispatch(fetchRecipes());
    }
    else dispatch(createRecipe(item));
    history.push("/");
   };

  return (
    <>
      <Header
        label="Přidat recept"
        onAdd={saveRecipe}
        onArrow={() => history.push("/")}
      />
      <FormContainer>
        {errors.length > 0 &&
          <ErrorsContainer>
            {errors.map((item, i) => <li key={i}>{item}</li>)}
          </ErrorsContainer>
        }
        <Input
          type="text"
          placeholder="Název receptu"
          value={item.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        {!recipe && (<>
          <Input
            type="text"
            placeholder="Úvodní text"
            value={item.info}
            onChange={(e) => onChange('info', e.target.value)}
          />
          <h3>INGREDIENCE</h3>
          {item.ingredients.map((ingredient, i) => <Ingredient key={i}>{ingredient}</Ingredient>)}
          <Input
            type="text"
            placeholder="Vaše ingredience"
            value={ing}
            onChange={(e) => setIng(e.target.value)}
          />
          <Button onClick={addIngredient}>PŘIDAT</Button>
          <TextArea
            cols="4"
            placeholder="Postup"
            value={item.description}
            onChange={(e) => onChange('description', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Čas"
            value={item.duration}
            onChange={(e) => onChange('duration', e.target.value)}
          />
        </>)}
      </FormContainer>
    </>
  )
};

export default Form;
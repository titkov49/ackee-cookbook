import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Header from '../Header';
import ListItem from './ListItem';

const StyledListContainer = styled.ul`
  margin-top: 4rem;
  padding: 0;
`;

const List = () => {
  let history = useHistory();
  const recipesList = useSelector(state => state.recipesList);

  return (
    <>
      <Header 
        label="Recepty"
        onAdd={() => history.push("/new")}
      />
      <StyledListContainer>
        {recipesList.recipes.map(item => <ListItem key={item.id} item={item} />) }
      </StyledListContainer>
    </>
  )
}

export default List;
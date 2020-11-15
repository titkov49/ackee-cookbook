import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../Header/Header';
import ListItem from './ListItem';

const StyledListContainer = styled.ul`
  margin-top: 4rem;
  padding: 0;
`;

const List = () => {
  const recipesList = useSelector(state => state.recipesList);

  return (
    <>
      <Header 
        label="Recepty"
        add={{ onClick: () => alert("Clicked!") }}
      />
      <StyledListContainer>
        {recipesList.recipes.map(item => <ListItem key={item.id} item={item} />) }
      </StyledListContainer>
    </>
  )
}

export default List;
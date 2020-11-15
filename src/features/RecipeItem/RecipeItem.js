import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import image from '../ackee.jpg';
import StarRateIcon from '@material-ui/icons/StarRate';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { addRating } from './itemSlice';

const Header = styled.div`
  width: 100%;
  height: 24rem;
  position: relative;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${image});
  background-repeat: no-repeat;
  background-clip: padding-box
  background-size: auto;

  h3 {
    color: white;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }
`;

const BaseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: violet;
  color: white;
  
  div {
    font-size: 1rem;
  }

  .MuiSvgIcon-root {
    margin: auto 0.25rem auto 0;
    font-size: 1rem !important;
  }
`;

const Description = styled.div`
  text-align: left;
  padding: 1rem;

  h3 {
    color: blue;
    margin: 0.5rem 0;
  }
  ul {
    padding-left: 1rem;
    li {
      padding-left: 1.5rem;
    }
  }
`;

const RatingContainer = styled.div`
  padding: 1.5rem;
  background-color: blue;
  text-align: center;
  color: white;
`;

const RecipeItem = () => {
  const dispatch = useDispatch();
  const recipeItem = useSelector(state => state.recipeItem);

  if (!recipeItem || !recipeItem.recipe) return <p>No item</p>

  const { name, description, duration,
    ingredients, info, score, rating
  } = recipeItem.recipe;
  
  console.log(recipeItem);

  let scoreStars = [];
  if (score) {
    for (let i = 0; i < score; i++) {
      scoreStars.push(<StarRateIcon key={i} />)
    }
  } else scoreStars = 'No score'

  
    const ratingStars = [];
    if (rating) {
      for (let i = 0; i < rating; i++)
        ratingStars.push(<StarRateIcon key={i} />);
    } else {
      for (let i = 0; i < 5; i++)
        ratingStars.push(<StarRateIcon key={i} onClick={() => dispatch(addRating(i))} />);
    }
  
  

  return (
    <>
      <Header>
        <h3>{name}</h3>
      </Header>
      <BaseInfo>
        <div>{scoreStars}</div>
        <div>
          <ScheduleIcon /> {duration} min.
        </div>
      </BaseInfo>
      <Description>
        <p>{info}</p>
        <h3>Ingredience</h3>
        <ul>
          {ingredients.map(item => <li>{item}</li>)}
        </ul>
        <h3>Příprava jídla</h3>
        <p>{description}</p>
      </Description>
      <RatingContainer>
        <h4>{rating ? 'Your rating' : 'Ohodnoť tento recept'}</h4>
        <div>{ratingStars}</div>
      </RatingContainer>
    </>
  )
};

export default RecipeItem;

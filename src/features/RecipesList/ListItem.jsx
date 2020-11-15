import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRateIcon from '@material-ui/icons/StarRate';
import ScheduleIcon from '@material-ui/icons/Schedule';
import logo from '../ackee.jpg';
import { fetchRecipe } from '../RecipeItem/itemSlice';

const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid grey;
  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 5px;
  height: 5rem;
  width: 5rem;
  margin-right: 1rem;
`;

const InfoContainer = styled.div`
  text-align: left;
  h3 {
    color: blue;
    margin: 0.5rem 0rem;
  }
  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 1rem;

    .star-icon {
      color: violet;
    }
  }
`;

const StyledScheduleIcon = styled(ScheduleIcon)`
  margin: auto 0.25rem auto 0;
  font-size: 1rem !important;
`;

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const stars = [];

  for (let i = 0; i < item.score; i++) {
    stars.push(<StarRateIcon key={i} className="star-icon"/>);
  }

  return (
    <Link to="/item">
      <ItemContainer onClick={() => dispatch(fetchRecipe(item.id))}>
        <Image src={logo}/>
        <InfoContainer>
          <h3>{item.name}</h3>
          <div>{stars}</div>
          <div><StyledScheduleIcon /> {item.duration} min.</div>
        </InfoContainer>
      </ItemContainer>
    </Link>
  )
};

export default ListItem;
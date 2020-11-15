import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { Link } from 'react-router';

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 9999;
  background-color: white;
  top: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  box-shadow: 0 5px 10px -7px gray;

  div {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 900px) {
    width: 25%;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  color: blue;
  cursor: pointer;`
  ;

const StyledArrowIcon = styled(ArrowBackIcon)`
  color: blue;
  margin-right: 1rem;
  cursor: pointer;
`;

const Header = ({ label, arrow, add }) => {
  return (
    <HeaderContainer>
      <div>
        {arrow &&
          <StyledArrowIcon onClick={arrow.onClick} />
        }
        <h3>{label}</h3>
      </div>
      <StyledAddIcon onClick={add.onClick} />
    </HeaderContainer>
  );
}

export default Header;
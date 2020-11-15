import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const HeaderContainer = styled.header`
  position: ${({ absolute }) => absolute ? 'absolute' : 'fixed'};
  z-index: 9999;
  background-color: ${({ absolute }) => absolute ? 'transparent' : 'white'};
  top: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  box-sizing: border-box;
  color: ${({ absolute }) => absolute ? 'white' : 'blue'};
  border-bottom: ${({ absolute }) => absolute ? 'none' : '1px solid gray'};
  box-shadow: ${({ absolute }) => absolute ? 'none' : '0 5px 10px -7px gray'};

  div {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 900px) {
    width: 25%;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  cursor: pointer;`
  ;

const StyledArrowIcon = styled(ArrowBackIcon)`
  margin-right: 1rem;
  cursor: pointer;
`;

const Header = ({ label, onArrow, onAdd, absolute }) => (
  <HeaderContainer absolute={absolute}>
    <div>
      {onArrow &&
        <StyledArrowIcon onClick={onArrow} />
      }
      <h3>{label}</h3>
    </div>
    <StyledAddIcon onClick={onAdd}/>
  </HeaderContainer>
);

export default Header;
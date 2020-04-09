import React from 'react';
import styled from 'styled-components';

import { LockOpen } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const StyledAvatar = styled(Avatar)`
  && {
    margin: 8px;
    background: ${(props) => props.theme.avatar_bg};
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
`;

const LoginForm = ({ title, children }) => {
  return (
    <Container component="main" maxWidth="xs">
      <StyledWrapper>
        <StyledAvatar>
          <LockOpen />
        </StyledAvatar>
        <Title>{title}</Title>
        {children}
      </StyledWrapper>
    </Container>
  );
};

export default LoginForm;

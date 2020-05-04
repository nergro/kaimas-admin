import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { getUserProperty } from 'Helpers/localUser';
import { useAuthenticated } from 'react-admin';

const StyledCard = styled(Card)`
  padding: 20px;
`;

const CardHeading = styled(CardHeader)`
  text-align: center;
`;

export default () => {
  useAuthenticated();
  const user = getUserProperty('name');
  const title = `Welcome ${user}!`;
  return (
    <StyledCard>
      <CardHeading title={title} />
    </StyledCard>
  );
};

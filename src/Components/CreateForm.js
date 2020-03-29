import React from 'react';
import styled from 'styled-components';
import { Create } from 'react-admin';

const StyledCreate = styled(Create)`
  & > div {
    overflow: unset;
  }
`;

export const CreateComponent = ({ children, props }) => {
  return <StyledCreate {...props}>{children}</StyledCreate>;
};

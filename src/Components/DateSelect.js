import React from 'react';
import styled from 'styled-components';
import DateSelectField from './DateSelectField';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;
const Title = styled.span`
  margin-top: 15px;
  font-weight: 700;
`;

export const DateSelect = ({ source, title, placeholder, initialDate }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <DateSelectField placeholder={placeholder} source={source} initialDate={initialDate} />
    </Wrapper>
  );
};

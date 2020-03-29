import React from 'react';
import styled from 'styled-components';
import ReactSelectField from '../Atoms/ReactSelectField';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 10px 0;
`;

export const SingleSelect = ({
  label,
  paramsName,
  choices,
  placeholder,
  filterParam,
  filterValue,
  filterNotNullParam,
  getSelected,
}) => {
  if (filterParam && filterValue && filterNotNullParam) {
    choices = choices.filter(choice => {
      return choice[filterParam] === filterValue && choice[filterNotNullParam] != null;
    });
  } else if (filterParam && filterValue) {
    choices = choices.filter(choice => choice[filterParam] === filterValue);
  } else if (filterNotNullParam) {
    choices = choices.filter(choice => choice[filterNotNullParam] != null);
  }

  const options = Array.isArray(choices) ? transformArray(choices) : choices;
  return options ? (
    <Wrapper>
      <ReactSelectField
        label={label}
        source={paramsName}
        options={options}
        placeholder={placeholder}
        getSelected={getSelected}
      />
    </Wrapper>
  ) : null;
};

const transformArray = array => {
  const newArray = array.map(item => ({
    label: `${item.name} ${item.last_name ? item.last_name : ''}`,
    value: item.id,
  }));

  return newArray;
};

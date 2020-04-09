import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const InputError = styled.div`
  color: #ff0000;
  text-align: center;
`;

const InputWithError = ({
  name,
  label,
  type,
  onChange,
  error,
  multiline,
  value,
}) => {
  return (
    <Fragment>
      <TextField
        name={name}
        value={value}
        type={type}
        label={label}
        onChange={e => onChange(e)}
        multiline={multiline}
        rows={multiline && '5'}
        rowsMax={multiline && '10'}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      {error ? <InputError>{error}</InputError> : null}
    </Fragment>
  );
};

export default InputWithError;

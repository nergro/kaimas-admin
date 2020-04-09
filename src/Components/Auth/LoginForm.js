import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import TextFieldWithError from './TextFieldWithError';
import Button from '@material-ui/core/Button';

const StyledForm = styled.form`
  width: 100%;
  margin-top: 8px;
`;
const StyledButton = styled(Button)`
  && {
    margin: 24px 0px 16px;
  }
`;

const Form = ({ initialValues, onSubmit, validationSchema }) => {
  const change = (e, handleChange) => {
    e.persist();
    handleChange(e);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      render={(props) => (
        <StyledForm onSubmit={props.handleSubmit}>
          <TextFieldWithError
            name="email"
            label="Email"
            onChange={(e) => change(e, props.handleChange)}
            error={props.errors.email}
          />
          <TextFieldWithError
            name="password"
            label="Password"
            type="password"
            onChange={(e) => change(e, props.handleChange)}
            error={props.errors.password}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={props.isSubmitting}
          >
            Login
          </StyledButton>
        </StyledForm>
      )}
    />
  );
};

export default Form;

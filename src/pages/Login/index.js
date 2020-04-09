import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import Wrapper from 'Components/Auth/AuthLayout';
import LoginForm from 'Components/Auth/LoginForm';
import { setLocalUser } from 'Helpers/localUser';

class Login extends Component {
  submit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const {
        data: { id, name, token, userType },
      } = await axios.post(`/user/login`, values);
      setLocalUser(id, name, token, userType);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.userLogin({ isAuth: true });
      actions.setSubmitting(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        actions.setErrors({ password: 'Invalid credentials' });
      } else actions.setErrors({ password: 'Network error' });
      actions.setSubmitting(false);
    }
  };

  render() {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    return (
      <Wrapper title="Login">
        <LoginForm
          initialValues={{ email: '', password: '' }}
          onSubmit={this.submit}
          validationSchema={schema}
        />
      </Wrapper>
    );
  }
}

export default connect(undefined, { userLogin })(Login);

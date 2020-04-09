import React from 'react';
import {
  Edit as EditComp,
  PasswordInput,
  SimpleForm,
  required,
  Show as ShowComp,
  SimpleShowLayout,
  TextField,
  Toolbar,
  SaveButton,
} from 'react-admin';

const validatePasswords = (values) => {
  const errors = {};

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = ['Passwords must match'];
  }

  return errors;
};

const ProfileEditActions = ({ basePath, data, resource }) => (
  <Toolbar>
    <h2>Change user password</h2>
  </Toolbar>
);

export const Edit = (props) => {
  const PostEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );

  return (
    <EditComp
      id="my-profile"
      resource="profile"
      basePath="/my-profile"
      title=" "
      actions={<ProfileEditActions />}
      undoable={false}
      {...props}
    >
      <SimpleForm toolbar={<PostEditToolbar />} redirect="show" validate={validatePasswords}>
        <PasswordInput source="password" label="New password" validate={required()} />
        <PasswordInput source="confirmPassword" label="Repeat new password" validate={required()} />
      </SimpleForm>
    </EditComp>
  );
};

const ProfileShowActions = ({ basePath, data, resource }) => (
  <Toolbar>
    <h2>User details</h2>
  </Toolbar>
);

export const Show = (props) => {
  return (
    <ShowComp
      id="my-profile"
      resource="profile"
      basePath="/my-profile"
      title=" "
      actions={<ProfileShowActions />}
      {...props}
    >
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="email" />
        <TextField source="phone" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

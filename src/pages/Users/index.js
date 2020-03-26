import React from 'react';
import styled from 'styled-components';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  EmailField,
  SimpleShowLayout,
  EditButton,
  TextInput,
  ReferenceInput,
  ReferenceField,
  Filter,
  SelectInput as Select,
  ImageField,
} from 'react-admin';
import Button from '@material-ui/core/Button';

import { SectionTitle } from '../helpers';

import { getUserProperty } from 'Helpers/localUser';

export const List = props => {
  console.log(props);
  return (
    <ListComp exporter={false} {...props} bulkActionButtons={false}>
      <Datagrid rowClick="show">
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="lastName" />
        <EmailField source="email" />
        <TextField source="phone" />
        <TextField source="userType" />
      </Datagrid>
    </ListComp>
  );
};

export const Show = props => {
  return <ShowComp title={<SectionTitle action="User" />} {...props}></ShowComp>;
};

export const Edit = props => {
  return <></>;
};

export const Create = props => {
  return <></>;
};

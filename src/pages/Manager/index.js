import React from 'react';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  SimpleShowLayout,
  TextInput,
  SimpleForm,
  required,
} from 'react-admin';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="phone" />
        <TextField source="email" />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Benefit" />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="phone" />
        <TextField source="email" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
        <TextInput source="lastName" validate={required()} />
        <TextInput source="phone" validate={required()} />
        <TextInput source="email" validate={required()} />
      </SimpleForm>
    </CreateComponent>
  );
};

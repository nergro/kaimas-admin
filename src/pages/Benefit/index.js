import React from 'react';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  SimpleShowLayout,
  EditButton,
  TextInput,
  SimpleForm,
  required,
  Edit as EditComp,
} from 'react-admin';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="descriptionEN" label="Description" />
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Benefit" />} {...props}>
      <SimpleShowLayout>
        <TextField source="descriptionLT" label="Description LT" />
        <TextField source="descriptionEN" label="Description EN" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="descriptionLT" label="Description LT" validate={required()} multiline />
        <TextInput source="descriptionEN" label="Description EN" validate={required()} multiline />
      </SimpleForm>
    </CreateComponent>
  );
};

export const Edit = (props) => {
  return (
    <EditComp {...props} title={<SectionTitle action="Cabin" />}>
      <SimpleForm redirect="show">
        <TextInput source="descriptionLT" label="Description LT" validate={required()} multiline />
        <TextInput source="descriptionEN" label="Description EN" validate={required()} multiline />
      </SimpleForm>
    </EditComp>
  );
};

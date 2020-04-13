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
        <TextField source="nameEN" label="Name EN" />
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Activity category" />} {...props}>
      <SimpleShowLayout>
        <TextField source="nameLT" label="Name LT" />
        <TextField source="nameEN" label="Name EN" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="nameLT" label="Name LT" validate={required()} />
        <TextInput source="nameEN" label="Name EN" validate={required()} />
      </SimpleForm>
    </CreateComponent>
  );
};

export const Edit = (props) => {
  return (
    <EditComp {...props} title={<SectionTitle action="Cabin" />}>
      <SimpleForm redirect="show">
        <TextInput source="nameLT" label="Name LT" validate={required()} />
        <TextInput source="nameEN" label="Name EN" validate={required()} />
      </SimpleForm>
    </EditComp>
  );
};

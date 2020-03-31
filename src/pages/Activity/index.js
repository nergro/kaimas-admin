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
  NumberField,
  NumberInput,
  required,
  Edit as EditComp,
  ImageField,
  ImageInput,
  SelectInput,
} from 'react-admin';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = props => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <TextField source="category" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = props => {
  return (
    <ShowComp title={<SectionTitle action="Activity" />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="description" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <ImageField source="images" src="url" title="desc" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = props => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
        <SelectInput
          source="category"
          choices={[
            { id: 'water', name: 'Water' },
            { id: 'active', name: 'Active' },
            { id: 'relax', name: 'Relax' },
          ]}
          validate={required()}
        />
        <TextInput source="description" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
      </SimpleForm>
    </CreateComponent>
  );
};

export const Edit = props => {
  return (
    <EditComp {...props} title={<SectionTitle action="Activity" />}>
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
        <SelectInput
          source="category"
          choices={[
            { id: 'water', name: 'Water' },
            { id: 'active', name: 'Active' },
            { id: 'relax', name: 'Relax' },
          ]}
          validate={required()}
        />
        <TextInput source="description" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
      </SimpleForm>
    </EditComp>
  );
};

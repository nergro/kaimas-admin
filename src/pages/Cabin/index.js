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
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  DateField,
} from 'react-admin';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = props => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = props => {
  return (
    <ShowComp title={<SectionTitle action="Cabin" />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <ImageField source="images" src="url" title="desc" />
        <ReferenceArrayField label="" reference="availableDate" source="availableDates">
          <Datagrid rowClick="show" label="Dates">
            <DateField source="date" />
          </Datagrid>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = props => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
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
    <EditComp {...props} title={<SectionTitle action="Cabin" />}>
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
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

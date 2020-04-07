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
  ReferenceArrayField,
  DateField,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  ReferenceField,
} from 'react-admin';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="name" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <ReferenceField label="Category" source="category" reference="activityCategory">
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Activity" />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="description" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <ReferenceField label="Category" source="category" reference="activityCategory">
          <TextField source="name" />
        </ReferenceField>
        <ImageField source="images" src="url" title="desc" />
        <ReferenceArrayField label="" reference="availableDate" source="availableDates">
          <Datagrid rowClick="show">
            <DateField source="date" label="Available dates" />
          </Datagrid>
        </ReferenceArrayField>
        <ReferenceArrayField label="" reference="benefit" source="benefits">
          <Datagrid rowClick="show">
            <TextField source="description" label="Benefits" />
          </Datagrid>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
        <TextInput source="description" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <ReferenceInput label="Category" source="category" reference="activityCategory">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ReferenceArrayInput label="Benefits" source="benefits" reference="benefit">
          <SelectArrayInput optionText="description" />
        </ReferenceArrayInput>
      </SimpleForm>
    </CreateComponent>
  );
};

export const Edit = (props) => {
  return (
    <EditComp {...props} title={<SectionTitle action="Activity" />}>
      <SimpleForm redirect="show">
        <TextInput source="name" validate={required()} />
        <TextInput source="description" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <ReferenceInput label="Category" source="category" reference="activityCategory">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ReferenceArrayInput label="Benefits" source="benefits" reference="benefit">
          <SelectArrayInput optionText="description" />
        </ReferenceArrayInput>
      </SimpleForm>
    </EditComp>
  );
};

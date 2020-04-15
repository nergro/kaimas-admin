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
  ReferenceArrayField,
  DateField,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';
import { MultiTextField } from 'Components/MultiTextField';
import { MultiImageField } from 'Components/MultiImageField';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';

export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="nameEN" label="Name" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <TextField source="address" />
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Cabin" />} {...props}>
      <SimpleShowLayout>
        <TextField source="nameLT" label="Name LT" />
        <TextField source="nameEN" label="Name LT" />
        <MultiTextField source="descriptionLT" label="Description LT" />
        <MultiTextField source="descriptionEN" label="Description EN" />
        <NumberField source="price" />
        <NumberField source="capacity" />
        <TextField source="address" />
        <ImageField source="thumbnail.url" title="thumbnail" label="Thumbnail" />
        <MultiImageField source="images" src="url" label="Images" />
        <ReferenceArrayField label="" reference="availableDate" source="availableDates">
          <Datagrid rowClick="show">
            <DateField source="date" label="Available dates" locales="lt-LT" />
          </Datagrid>
        </ReferenceArrayField>
        <ReferenceArrayField label="" reference="benefit" source="benefits">
          <Datagrid rowClick="show">
            <TextField source="descriptionEN" label="Benefits" />
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
        <TextInput source="nameLT" label="Name LT" validate={required()} />
        <TextInput source="nameEN" label="Name EN" validate={required()} />
        <TextInput source="descriptionLT" label="Description LT" validate={required()} multiline />
        <TextInput source="descriptionEN" label="Description EN" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <TextInput source="address" validate={required()} />
        <ImageInput
          source="thumbnail"
          label="Upload thumbnail"
          accept="image/*"
          validate={required()}
        >
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ReferenceArrayInput label="Benefits" source="benefits" reference="benefit">
          <SelectArrayInput optionText="descriptionEN" />
        </ReferenceArrayInput>
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
        <TextInput source="descriptionLT" label="Description LT" validate={required()} multiline />
        <TextInput source="descriptionEN" label="Description EN" validate={required()} multiline />
        <NumberInput source="price" step={1} validate={required()} />
        <NumberInput source="capacity" step={1} validate={required()} />
        <TextInput source="address" validate={required()} />
        <ImageInput
          source="thumbnail"
          label="Upload thumbnail"
          accept="image/*"
          validate={required()}
        >
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ImageInput source="images" label="Upload images" accept="image/*" multiple>
          <ImageField source="url" title="Images" />
        </ImageInput>
        <ReferenceArrayInput label="Benefits" source="benefits" reference="benefit">
          <SelectArrayInput optionText="descriptionEN" />
        </ReferenceArrayInput>
      </SimpleForm>
    </EditComp>
  );
};

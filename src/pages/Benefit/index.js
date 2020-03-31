import React, { useState } from 'react';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  SimpleShowLayout,
  EditButton,
  TextInput,
  SimpleForm,
  NumberInput,
  required,
  Edit as EditComp,
  ImageField,
  ImageInput,
  ReferenceField,
  DateField,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

import Select from 'react-select';
import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';
import styled from 'styled-components';
import { DateSelect } from 'Components/DateSelect';

const StyledSelect = styled(Select)`
  .service-selector__menu {
    z-index: 1000;
  }
`;
export const List = props => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="description" />
        <TextField source="onModel" label="Service" />
        <ReferenceField
          label="Cabin Name"
          source="serviceId"
          reference="cabin"
          allowEmpty={true}
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = props => {
  return (
    <ShowComp title={<SectionTitle action="Cabin" />} {...props}>
      <SimpleShowLayout>
        <TextField source="description" />
        <TextField source="onModel" label="Service" />
        <ReferenceField
          label="Cabin Name"
          source="serviceId"
          reference="cabin"
          allowEmpty={true}
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = props => {
  const [selectedService, setSelectedService] = useState('cabin');
  const services = [
    { value: 'cabin', label: 'Cabin' },
    { value: 'activity', label: 'Activity' },
  ];

  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <p>Service Type</p>
        <StyledSelect
          classNamePrefix="service-selector"
          options={services}
          defaultValue={services[0]}
          onChange={selected => setSelectedService(selected.value)}
        />
        <p>Service</p>
        {selectedService === 'cabin' ? (
          <ReferenceInput label="Cabin" source="Cabin" reference="cabin" validate={[required()]}>
            <SelectInput optionText="name" />
          </ReferenceInput>
        ) : null}
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

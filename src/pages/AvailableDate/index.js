import React, { useState } from 'react';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  SimpleShowLayout,
  EditButton,
  SimpleForm,
  required,
  DateField,
  ReferenceInput,
  SelectInput,
  DeleteButton,
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
export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <DateField source="date" />
        <TextField source="onModel" label="Service" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="AvailableDate" />} {...props}>
      <SimpleShowLayout>
        <DateField source="date" />
        <TextField source="onModel" label="Service" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  const [selectedService, setSelectedService] = useState('cabin');
  const services = [
    { value: 'cabin', label: 'Cabin' },
    { value: 'activity', label: 'Activity' },
  ];

  const day = 60 * 60 * 24 * 1000;
  const start = new Date();
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const from = new Date(start.getTime() + day);
  const to = new Date(start.getTime() + day * 2);

  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <p>Service Type</p>
        <StyledSelect
          classNamePrefix="service-selector"
          options={services}
          defaultValue={services[0]}
          onChange={(selected) => setSelectedService(selected.value)}
        />
        <p>Service</p>
        {selectedService === 'cabin' ? (
          <ReferenceInput label="Cabin" source="cabin" reference="cabin" validate={[required()]}>
            <SelectInput optionText="name" />
          </ReferenceInput>
        ) : (
          <ReferenceInput
            label="Activity"
            source="activity"
            reference="activity"
            validate={[required()]}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        <DateSelect
          source="from"
          placeholder="Select date and time "
          title="From"
          initialDate={from}
        />
        <DateSelect source="to" placeholder="Select date and time " title="To" initialDate={to} />
      </SimpleForm>
    </CreateComponent>
  );
};

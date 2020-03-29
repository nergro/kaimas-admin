import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'Providers/dataProvider';
import { Home, EventAvailable } from '@material-ui/icons';
import { cabins, availableDates } from './pages';

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="cabin"
        icon={Home}
        list={cabins.List}
        show={cabins.Show}
        edit={cabins.Edit}
        create={cabins.Create}
      />
      <Resource
        name="availableDate"
        icon={EventAvailable}
        list={availableDates.List}
        show={availableDates.Show}
        edit={availableDates.Edit}
        create={availableDates.Create}
      />
    </Admin>
  );
};

export default App;

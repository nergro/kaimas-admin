import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'Providers/dataProvider';
import { AccountBox } from '@material-ui/icons';
import { cabins } from './pages';

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="cabin"
        icon={AccountBox}
        list={cabins.List}
        show={cabins.Show}
        edit={cabins.Edit}
        create={cabins.Create}
      />
    </Admin>
  );
};

export default App;

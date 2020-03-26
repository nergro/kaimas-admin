import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'Providers/dataProvider';
import authProvider from 'Providers/authProvider';
import { AccountBox } from '@material-ui/icons';
import { users } from './pages';

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      // authProvider={authProvider}
    >
      <Resource
        name="user"
        icon={AccountBox}
        list={users.List}
        show={users.Show}
        edit={users.Edit}
        create={users.Create}
      />
    </Admin>
  );
};

export default App;

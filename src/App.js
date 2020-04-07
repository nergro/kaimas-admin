import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from 'Providers/dataProvider';
import {
  Home,
  EventAvailable,
  ThumbUp,
  DirectionsRun,
  Category,
  SupervisorAccount,
  Email,
} from '@material-ui/icons';
import {
  cabin,
  availableDate,
  benefit,
  activity,
  activityCategory,
  newsletter,
  manager,
} from './pages';

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="cabin"
        icon={Home}
        list={cabin.List}
        show={cabin.Show}
        edit={cabin.Edit}
        create={cabin.Create}
      />
      <Resource
        name="activity"
        icon={DirectionsRun}
        list={activity.List}
        show={activity.Show}
        edit={activity.Edit}
        create={activity.Create}
      />
      <Resource
        name="availableDate"
        options={{ label: 'Available Dates' }}
        icon={EventAvailable}
        list={availableDate.List}
        show={availableDate.Show}
        edit={availableDate.Edit}
        create={availableDate.Create}
      />
      <Resource
        name="benefit"
        icon={ThumbUp}
        list={benefit.List}
        show={benefit.Show}
        edit={benefit.Edit}
        create={benefit.Create}
      />
      <Resource
        name="activityCategory"
        options={{ label: 'Activity Categories' }}
        icon={Category}
        list={activityCategory.List}
        show={activityCategory.Show}
        edit={activityCategory.Edit}
        create={activityCategory.Create}
      />
      <Resource
        name="newsletter"
        icon={Email}
        list={newsletter.List}
        show={newsletter.Show}
        create={newsletter.Create}
      />
      <Resource
        name="manager"
        icon={SupervisorAccount}
        list={manager.List}
        show={manager.Show}
        create={manager.Create}
      />
    </Admin>
  );
};

export default App;

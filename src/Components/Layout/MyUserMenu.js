import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetOne, UserMenu, MenuItemLink } from 'react-admin';
import { Settings, AccountBox } from '@material-ui/icons';
import { getUserProperty } from 'Helpers/localUser';

class MyUserMenuView extends Component {
  render() {
    const { crudGetOne, profile, ...props } = this.props;
    const localUserId = getUserProperty('id');
    return (
      <UserMenu label="" {...props}>
        <MenuItemLink
          to={`/profile/${localUserId}/show`}
          primaryText="Details"
          leftIcon={<AccountBox />}
        />
        <MenuItemLink
          to={`/profile/${localUserId}/edit`}
          primaryText="Change password"
          leftIcon={<Settings />}
        />
      </UserMenu>
    );
  }
}

const mapStateToProps = (state) => {
  const resource = 'profile';
  const id = 'my-profile';

  return {
    profile: state.admin.resources[resource] ? state.admin.resources[resource].data[id] : null,
  };
};

const MyUserMenu = connect(mapStateToProps, { crudGetOne })(MyUserMenuView);
export default MyUserMenu;

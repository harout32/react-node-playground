import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State, RolesStateType, PermissionsStateType } from '../../models';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { List, Button, Tooltip, Drawer } from 'antd';

interface Props extends RouteComponentProps {
  roles: RolesStateType;
}

class Role extends Component<Props> {
  navigateToRole = (event: Event) => {
    console.log(event);
  }
  render() {
    return (
      <>
      <div className="roles-container">
        <List
          className="role-list"
          size="small"
          bordered
          dataSource={Object.keys(this.props.roles)}
          renderItem={(id: string) => (<List.Item key={id} id={id}> <Link to={'/dashboard/roles/' + id}>{this.props.roles[id].name} </Link></List.Item>)}
        />
        <div className="role-control">
          <Tooltip placement="top" title="Add a Role">
            <Button type="primary" shape="circle" icon="usergroup-add" />
          </Tooltip>
        </div>
      </div>

      </>
    )
  }
}
const mapStateTpoProps = (state: State) => {
  return {
    roles: state.role.roles,
  };
};
export const RolesSubPage = connect(
  mapStateTpoProps,
  null
)(Role);

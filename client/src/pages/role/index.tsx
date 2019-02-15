import React, { Component } from 'react';
import { Transfer } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { TransferItem } from 'antd/lib/transfer';
import { RolesStateType, PermissionsStateType, State } from '../../models';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { roleDeletePermissionsActionCreator, roleAddPermissionsActionCreator } from '../../actions';

interface Props extends RouteComponentProps {
  roles: RolesStateType;
  permissions: PermissionsStateType;
  dispatch: Dispatch
}

class Role extends Component<Props> {
  handleChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    const { id } = this.props.match.params as { id: string };
    if(direction === 'left') {
    // delete the selected permissions from the role
    this.props.dispatch<any>(roleDeletePermissionsActionCreator(id, moveKeys));

    return;
    }
    // add the selected permissions to the role
    this.props.dispatch<any>(roleAddPermissionsActionCreator(id, moveKeys));

  };
  renderItem = (item: TransferItem) => {
    return item.title;
  };
  sorceData = (perId: string): TransferItem => {
      return {
        key: perId,
        title: this.props.permissions[perId],
      };
  };
  render() {
    const { id } = this.props.match.params as { id: string };
    const {permissions, roles} = this.props;
    return (
      <Transfer
        dataSource={Object.keys(permissions).map(this.sorceData)}
        titles={['All Permissions', `${roles[id].name}'s Permissions`]}
        listStyle={{
          width: 300,
          height: 300
        }}
        targetKeys={Object.keys(roles[id].permissions)}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    );
  }
}
const mapStateTpoProps = (state: State) => {
  return {
    roles: state.role.roles,
    permissions: state.role.permissions,
  };
};
export const RolePage = connect(
  mapStateTpoProps,
  (dispatch: Dispatch)=> ({dispatch}),
)(Role);

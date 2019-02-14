import React, { Component } from 'react';
import queryString from 'query-string';
import { Breadcrumb, Icon } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { State, RoleState } from '../../models';
import { RolesRouter } from '../../routers';

interface Props extends RouteComponentProps {
  roles: { [key: string]: { name: string; permissions: string[] } };
}

export class Roles extends Component<Props> {
    getRoleId() {
        return this.props.location.pathname.split('/')[3];
    }
  render() {
    const id = this.getRoleId();
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item >
            <Icon type="user" />
            <Link to="/dashboard/roles">Roles</Link>
          </Breadcrumb.Item>

          {id && this.props.roles[id] ? <Breadcrumb.Item>{this.props.roles[id].name}</Breadcrumb.Item> : ''}
          
        </Breadcrumb>
        <div>
          <RolesRouter />
          {/* {Object.keys(this.props.roles).map(key => {
            return (<Link key={key} to={"/dashboard/roles/"+ key}> {this.props.roles[key].name} </Link>)
        })} */}
        </div>
      </>
    );
  }
}

const mapStateTpoProps = (state: State) => {
  return {
    roles: state.role.roles
  };
};
export const RolesPage = connect(
  mapStateTpoProps,
  null
)(Roles);

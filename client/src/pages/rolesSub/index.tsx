import React , {Component} from 'react';
import { connect } from 'react-redux';
import { State } from '../../models';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps {
    roles: { [key: string]: { name: string; permissions: string[] } };
  }
  
class Role extends Component <Props> {
    render() {
        return Object.keys(this.props.roles).map(key => (<Link key={key} to={"/dashboard/roles/"+ key}>{this.props.roles[key].name} </Link> ));
    }
}
const mapStateTpoProps = (state: State) => {
    return {
      roles: state.role.roles
    };
  };
  export const RolesSubPage = connect(
    mapStateTpoProps,
    null
  )(Role);
  
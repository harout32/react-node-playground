import React , { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State, UserState } from '../models';
import { loginAction } from '../actions';

const mapStateToProps = (state: State) => ({user: state.user});

class UserData extends Component <{ children: any, user: UserState }, {}> {


    render () {
        return (<>
        {this.props.children(this.props.user)};
        </>)
    }
}

export const WithUserData = connect( mapStateToProps )( UserData );
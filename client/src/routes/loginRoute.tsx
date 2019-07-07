import React , {Component} from 'react';
import { State } from '../models';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
    Component: React.ComponentType<any>
    isLoggedIn: boolean;

}

const Login = ({Component, isLoggedIn}: Props) => {
    
        return (
            isLoggedIn ? <Redirect to="/dashboard" /> : <Component />
        )

}

const mapStateToProps = (state: State) => ({
    isLoggedIn: state.user.isLoggedIn,
});

export const LoginRoute = connect(mapStateToProps)(Login);
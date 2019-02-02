import React, { Component } from 'react';
import {LoginComponent} from '../../components';
import { apiLogin } from '../../api';
import { LoginRequestModel, LoginResponseModel, State } from '../../models';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loginAction } from '../../actions';



 class Login extends Component <{data?: any, login: (userName: string)=>void}, {}> {
    componentDidMount() {
        console.log(this.props);
    }
    login = async (form: LoginRequestModel) => {

        try {
            const userData: LoginResponseModel = await apiLogin(form);
            this.props.login('harout');
            console.log(this.props.data);
            console.log(userData);
            debugger;

        } catch (e) {
            debugger;
            console.log(e);
        }
    }
    render() {
        return (
            <h1>
                Hello I am Login page
                <LoginComponent onSubmit={this.login}></LoginComponent>
            </h1>
        )
    }
}
const mapStateToProps = (state: State) => ({user: state.user});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    login:(userName: string) => {dispatch(loginAction(userName))},
    
});
export const LoginPage = connect(null, mapDispatchToProps)(Login);
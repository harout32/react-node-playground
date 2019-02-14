import React, { Component } from 'react';
import {LoginComponent} from '../../components';
import { apiLogin } from '../../api';
import { LoginRequestModel, LoginResponseModel, State } from '../../models';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { userLoginActionCreator } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';


interface Props extends RouteComponentProps {data?: any, login: (form: LoginRequestModel)=>any}
 class Login extends Component <Props, {}> {

    componentDidMount() {
    }
    login (form: LoginRequestModel) {

        try {
            this.props.login(form).then((res: any )=> {
                console.log('action resolve', res);
            });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <h1>
                Hello I am Login page
                <LoginComponent onSubmit={this.login.bind(this)}></LoginComponent>
            </h1>
        )
    }
}
const mapStateToProps = (state: State) => ({user: state.user});
const mapDispatchToProps = (dispatch: Dispatch) => ({ login : (form: LoginRequestModel) => dispatch<any>(userLoginActionCreator(form)) });
export const LoginPage = connect(null, mapDispatchToProps)(Login);
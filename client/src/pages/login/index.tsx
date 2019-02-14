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
    constructor(props: Props) {
        super(props);
        // this.login = this.login.bind(this);
    }
    login  = (form: LoginRequestModel) => {
        try {
            this.props.login(form).then((res: any )=> {
                this.props.history.push('/dashboard')
            });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <>
                
                <div  className="login-component-wrapper">
                <LoginComponent onSubmit={this.login}></LoginComponent>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state: State) => ({user: state.user});
const mapDispatchToProps = (dispatch: Dispatch) => ({ login : (form: LoginRequestModel) => dispatch<any>(userLoginActionCreator(form)) });
export const LoginPage = connect(null, mapDispatchToProps)(Login);
import React, { Component } from 'react';
import {LoginComponent} from '../../components';
import { apiLogin } from '../../api';
import { LoginRequestModel, LoginResponseModel, State } from '../../models';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { userLoginActionCreator } from '../../actions';



 class Login extends Component <{data?: any, login: (form: LoginRequestModel)=>any}, {}> {
    componentDidMount() {
        console.log(this.props);
    }
    login = async (form: LoginRequestModel) => {

        try {
            this.props.login(form).then((res: any )=> {
                console.log(res);
            });
        } catch (e) {
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
const mapDispatchToProps = (dispatch: Dispatch) => ({ login : (form: LoginRequestModel) => dispatch<any>(userLoginActionCreator(form.userName, form.password)) });
export const LoginPage = connect(null, mapDispatchToProps)(Login);
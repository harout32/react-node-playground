import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';

import { LoginRequestModel } from '../../models';


interface Props extends FormComponentProps {
    onSubmit: (form: LoginRequestModel) => void;
}

export class Login extends PureComponent<Props> {
    componentDidMount() {
        console.dir(process.env);
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: LoginRequestModel) => {
            if (err) {
                return;
            }
            this.props.onSubmit(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Form onSubmit={this.handleSubmit} className="login-form login-wrapper">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button login-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}


export const LoginComponent = Form.create<Props>()(Login);
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
    Form, Icon, Input, Button
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';

import { LoginRequestModel } from '../../models';

interface State {
    lala: boolean
}
interface Props extends FormComponentProps {
    onSubmit: (form: LoginRequestModel) => Promise<void>;
}

export class Login extends PureComponent<Props, State> {
    state = {
        lala: false
    }
    componentDidMount() {
        console.dir(process.env);
    }
    handleSubmit = (e: any) => {
        this.setState((prevState: State, props: Props) => ({ lala: !prevState.lala }));
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
            <Form onSubmit={this.handleSubmit} className="login-form">
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

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
            </Button>
                </Form.Item>
        </Form>
        <Link to="/dashboard"> <h1> Go To Dashboard</h1></Link>
        </>
        );
    }
}


export const LoginComponent = Form.create<Props>()(Login);
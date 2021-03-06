import React from 'react';
import { Switch, Route, Redirect, Router, RouteComponentProps } from 'react-router-dom';
import { message } from 'antd';

import { axiosRequest } from '../api/axiosRequest';


import { LoginPage, DashboardPage } from '../pages';



import { PublicResolve } from '../routes/publicResolve';
import { PrivateResolve } from '../routes/privateResolve';
import { LoginRoute } from '../routes';

const SomeLoading = () => <h1> Loading.... </h1>;


export const MainRoutes = () => (

    <Switch>
        <Route path="/" exact={true} render={() => <Redirect to='/login' />}></Route>

        <Route
            path='/login'
            render={(props: RouteComponentProps) => {
                return <LoginRoute {...props} Component={LoginPage} />
            }}
        />
        <Route
            path='/dashboard'
            render={(props: RouteComponentProps) => {
                return <PrivateResolve {...props} Component={DashboardPage} LoadingComponent={SomeLoading}/>
                }}
        />
        <Route
            path="*"
            render={() => {
                message.error('please Login !');
                return <Redirect to='/login' />}}
                />

    </Switch>
);

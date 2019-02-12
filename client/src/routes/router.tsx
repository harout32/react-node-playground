import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { message } from 'antd';

import { axiosRequest } from '../api/axiosRequest';


import { LoginPage, DashboardPage } from '../pages';



import { PublicResolve } from './publicResolve';
import { PrivateResolve } from './privateResolve';
import { GetUserPermissionsActionCreator } from '../actions';

const SomeLoading = () => <h1> Loading.... </h1>;


export const Routes = () => (

    <Switch>
        <Route path="/" exact={true} render={() => <Redirect to='/login' />}></Route>

        <Route
            path='/login'
            render={(props: any) => {
                console.log('login');
                return <PublicResolve {...props} Component={LoginPage} />
            }}
        />
        <Route
            path='/dashboard'
            render={(props: any) => {
                console.log('dashboard');
                return <PrivateResolve {...props} Component={DashboardPage} resolve={GetUserPermissionsActionCreator} LoadingComponent={SomeLoading}/>
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

import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PublicResolve } from '../routes';

import { RolesPage } from '../pages';
import { RolesResolver } from '../actions';

export const DashboardRouter = () => (
    <>
        <Switch>
            <Route
                path='/dashboard/'
                exact={true}
                render={(props: any) => {
                    console.log('exact');
                    return <Redirect to="/dashboard/roles" />
                }}
            />
            <Route
                path='/dashboard/roles'
                render={(props: any) => {
                    console.log('roles')

                    return <PublicResolve {...props} resolve={RolesResolver} Component={RolesPage} />
                }}
            />
        </Switch>
    </>
);

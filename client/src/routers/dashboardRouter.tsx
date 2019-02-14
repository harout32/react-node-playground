import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { PublicResolve } from '../routes';

import { RolesPage } from '../pages';
import { RolesResolver } from '../actions';

export const DashboardRouter = () => (
  <>
    <Route
        path="/dashboard"
        exact={true}
        render={(props: RouteComponentProps) => {
          return (
            <Redirect
             to="/dashboard/roles"
            />
          );
        }}
      />
      <Route
        path="/dashboard/roles"
        render={(props: RouteComponentProps) => {
          return (
            <PublicResolve
              {...props}
              resolve={RolesResolver}
              Component={RolesPage}
            />
          );
        }}
      />
      
      
 </>
);

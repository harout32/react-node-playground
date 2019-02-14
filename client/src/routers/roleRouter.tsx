import React from 'react';
import { Route, Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { PublicResolve } from '../routes';

import { RolesPage, RolesSubPage } from '../pages';
import { RolesResolver, AllPermissionsResolver } from '../actions';

export const RolesRouter = () => (
  <>
    <Route
      path="/dashboard/roles"
      exact={true}
      render={(props: RouteComponentProps) => {
        return (
          <PublicResolve
            {...props}
            Component={RolesSubPage}
          />
        );
      }}
    />
    <Route
      path="/dashboard/roles/:id"
      render={(props: RouteComponentProps) => {
        return (
          <PublicResolve
            {...props}
            resolve={AllPermissionsResolver}
            Component={() => <h1>Role</h1>}
          />
        );
      }}
    />
  </>
);

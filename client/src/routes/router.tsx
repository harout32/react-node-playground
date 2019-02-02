import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { axiosRequest } from '../api/axiosRequest';
// import { PublicRoute }  from './publicRoute';
// import { PrivateRoute } from './privateRoute';

import { LoginPage, DashboardPage } from '../pages';
import { WithRouterData } from '../containers';
// import { UserState, RouterState } from '../models';

import { PublicResolve } from './publicResolve';
import { PrivateResolve } from './privateResolve';

const SomeLoading = () => <h1> Loading.... </h1>;

interface ChildrenParams { isLoggedIn: boolean; isRouterLoading: boolean; setLoading: (isLoading: boolean) => void }

enum routeType {
    private = 'private',
    public = 'public',
    permission = 'permission'
}
interface CustomRoute {
    path: string;
    Page: any;
    type: routeType;
    Loading?: any;
    resolve?: () => Promise<any>;
}
const routes: CustomRoute[] = [
    {
        path: '/login',
        Page: LoginPage,
        type: routeType.public,
    },
    {
        path: '/dashboard',
        Page: DashboardPage,
        type: routeType.private,
        Loading: SomeLoading,
        resolve: () => axiosRequest.get('/todos/1')
    }
];

export const Routes = () => (

    <Switch>
        <Route path="/" exact={true} render={() => <Redirect to='/login' />}></Route>

        <Route
            path='/login'
            render={(props: any) => {
                console.log('login');
                return <PublicResolve {...props} Component={LoginPage} />
            }}
        // LoadingComponent={SomeLoading}
        />
        <Route
            path='/dashboard'
            render={(props: any) =>{
                console.log('dashboard');
                return <PrivateResolve {...props} Component={LoginPage} />
                }}
        />

        {/* <WithRouterData >
                        {(data: ChildrenParams) => 
                        <Route
                            {...data}
                            path='/login'
                            render={(data: any) => {
                            return <LoginPage {...data} />
                            }}
                            // LoadingComponent={SomeLoading}
                            />}
                        
                    </WithRouterData>
                   
                
                    <WithRouterData >
                        {(data: ChildrenParams) => <Route
                        {...data}
                        path='/dashboard'
                        render={(data: any) => <DashboardPage {...data} />}
                        // resolve={() => axiosRequest.get('/todos/1')}
                        // LoadingComponent={SomeLoading}
                        />}
                    </WithRouterData> */}

    </Switch>
);

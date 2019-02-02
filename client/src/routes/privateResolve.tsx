import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { setRouterIsLoadingAction } from '../actions';
import { Dispatch } from 'redux';
import { State } from '../models';
import { DefaultLoader } from './defaultLoader';
import { RouteProps } from 'react-router-dom';
import { RouterProps, Redirect } from 'react-router';

interface Props extends RouteProps, RouterProps {
    Component: React.ComponentType<any>
    resolve?: () => Promise<any>;
    LoadingComponent?: React.ComponentType<any>;
    isRouterLoading: boolean;
    isLoggedIn: boolean;
    setLoading: (isLoading: boolean) => void;

}

export class CostumRoute extends PureComponent<Props, {}> {
    data: any = null;
    componentDidMount() {
        this.resolveData();
    }
    async resolveData() {
        const { resolve } = this.props;
        try {
            if (resolve) this.data = await resolve();
        } catch (err) {
            this.props.history.goBack();
            return;
        } finally {
            console.log('finally');
            this.props.setLoading(false);
        }
    }

    render() {
        const { Component, LoadingComponent, isLoggedIn } = this.props;
        if( isLoggedIn ) {
            return this.props.isRouterLoading ? (LoadingComponent ? <LoadingComponent /> : <DefaultLoader />) :
                (
                    <Component {...this.props} data={this.data} />
                );
        }
        return <Redirect  to='/login'/>
    }
}

const mapStateToProps = (state: State) => ({
    isRouterLoading: state.router.isLoading,
    isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (isLoading: boolean) => { dispatch(setRouterIsLoadingAction(isLoading)) },
});


export const PrivateResolve = connect(mapStateToProps, mapDispatchToProps)(CostumRoute);
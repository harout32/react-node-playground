import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteProps } from 'react-router-dom';
import { RouterProps, Redirect } from 'react-router';
import { message } from 'antd';

import { DefaultLoader } from './defaultLoader';
import { setRouterIsLoadingAction } from '../actions';
import { State, ActionCreator } from '../models';


interface Props extends RouteProps, RouterProps {
    Component: React.ComponentType<any>
    resolve?: ActionCreator<any>;
    LoadingComponent?: React.ComponentType<any>;
    isRouterLoading: boolean;
    isLoggedIn: boolean;
    setLoading: (isLoading: boolean) => void;
    dispatch: Dispatch

}

export class CostumRoute extends PureComponent<Props, {}> {
    data: any = null;
    componentDidMount() {
        this.props.setLoading(true);
        this.resolveData();
    }
    async resolveData() {
        const { resolve } = this.props;
        try {
            if (resolve) this.data = await this.props.dispatch<any>(resolve());
        } catch (err) {
            this.props.history.goBack();
            return;
        } finally {
            console.log('finally');
            this.props.setLoading(false);
        }
    }
    componentDidUpdate() {
        if(!this.props.isLoggedIn) message.error('Please Login Again !');
    }

    render() {
        const { Component, LoadingComponent, isLoggedIn, isRouterLoading } = this.props;
        if( isLoggedIn ) {
            return isRouterLoading ? (LoadingComponent ? <LoadingComponent /> : <DefaultLoader />) :
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
    dispatch,
});


export const PrivateResolve = connect(mapStateToProps, mapDispatchToProps)(CostumRoute);
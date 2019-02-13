import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteProps } from 'react-router-dom';
import { RouterProps, Redirect, RouteComponentProps } from 'react-router';
import { message } from 'antd';

import { DefaultLoader } from './defaultLoader';
import { setRouterIsLoadingAction } from '../actions';
import { State, ActionCreator } from '../models';


interface Props extends RouteComponentProps {
    Component: React.ComponentType<any>
    resolve?: ActionCreator<any>;
    LoadingComponent?: React.ComponentType<any>;
    isRouterLoading: boolean;
    isLoggedIn: boolean;
    setLoading: (isLoading: boolean) => void;
    dispatch: Dispatch;
    permissions: string[];

}

export class CostumRoute extends PureComponent<Props, {}> {
    state = {isLoading: true};
    componentDidMount() {
        
        this.resolveData();
    }
    async resolveData() {
        const { resolve } = this.props;
        try {
            if (this.props.isLoggedIn){ 
                if (resolve) await this.props.dispatch<any>(resolve());
                this.setState({isLoading: false});
            } else this.props.history.goBack();
        } catch (err) {
            this.props.history.goBack();
            return;
        }
    }
    componentDidUpdate() {
        if(!this.props.isLoggedIn) message.error('Please Login Again !');
    }
    render() {
        const { Component, LoadingComponent, isLoggedIn } = this.props;
        if( isLoggedIn ) {
            return this.state.isLoading ? (LoadingComponent ? <LoadingComponent /> : <DefaultLoader />) :
                (
                    <Component history={this.props.history} />
                );
        }
        return <Redirect  to='/login'/>
    }
}

const mapStateToProps = (state: State) => ({
    isRouterLoading: state.router.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    permissions: state.user.permissions
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (isLoading: boolean) => { dispatch(setRouterIsLoadingAction(isLoading)) },
    dispatch,
});


export const PrivateResolve = connect(mapStateToProps, mapDispatchToProps)(CostumRoute);
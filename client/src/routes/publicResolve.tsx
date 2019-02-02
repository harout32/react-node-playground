import React, { Component, PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { setRouterIsLoadingAction } from '../actions';
import { Dispatch } from 'redux';
import { State } from '../models';
import { DefaultLoader } from './defaultLoader';
import { RouteProps } from 'react-router-dom';
import { RouterProps } from 'react-router';

interface Props extends RouteProps, RouterProps {
    Component: React.ComponentType<any>
    resolve?: () => Promise<any>;
    LoadingComponent?: React.ComponentType<any>;
    isRouterLoading: boolean;
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
            debugger;
            console.log(err);
        } finally {
            this.props.setLoading(false);
        }
    }

    render() {
        const { Component, LoadingComponent } = this.props;
        return this.props.isRouterLoading ? (LoadingComponent ? <LoadingComponent /> : <DefaultLoader />) :
            (
                <Component {...this.props} data={this.data} />
            );
    }
}

const mapStateToProps = (state: State) => ({
    isRouterLoading: state.router.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (isLoading: boolean) => { dispatch(setRouterIsLoadingAction(isLoading)) },
});


export const PublicResolve = connect(mapStateToProps, mapDispatchToProps)(CostumRoute);
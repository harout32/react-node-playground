import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State, ActionCreator } from '../models';
import { DefaultLoader } from './defaultLoader';
import { RouteProps } from 'react-router-dom';
import { RouterProps } from 'react-router';

interface Props extends RouteProps, RouterProps {
    Component: React.ComponentType<any>
    resolve?: ActionCreator<any>;
    LoadingComponent?: React.ComponentType<any>;
    isRouterLoading: boolean;
    dispatch: Dispatch;
}

export class CostumRoute extends PureComponent<Props, {}> {
    state = {isLoading: true};
    componentDidMount() {
        this.resolveData();
    }
    async resolveData() {
        const { resolve } = this.props;
        try {
            if (resolve) await this.props.dispatch<any>(resolve());
        } catch (err) {
            this.props.history.goBack();
            console.log(err);
        } finally {
            this.setState({isLoading: false});
        }
    }
    render() {
        const { Component, LoadingComponent } = this.props;
        return this.state.isLoading ? (LoadingComponent ? <LoadingComponent /> : <DefaultLoader />) :
            (
                <Component {...this.props} />
            );
    }
}

const mapStateToProps = (state: State) => ({
    isRouterLoading: state.router.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatch,
});


export const PublicResolve = connect(mapStateToProps, mapDispatchToProps)(CostumRoute);
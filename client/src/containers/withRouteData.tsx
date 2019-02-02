import React , { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State, RouterState } from '../models';
import { loginAction, setRouterIsLoadingAction } from '../actions';

interface Props { children: any, isRouterLoading: boolean, isLoggedIn: boolean, setLoading: (isLoading: boolean ) => void }

class CustomRoute extends PureComponent <Props, {}> {


    render () {
        return (<>
        {this.props.children(this.props)};
        </>)
    }
}

const mapStateToProps = (state: State) => ({
    isRouterLoading: state.router.isLoading,
    isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (isLoading: boolean) => {dispatch(setRouterIsLoadingAction(isLoading))},
});


export const WithRouterData = connect( mapStateToProps, mapDispatchToProps )( CustomRoute );
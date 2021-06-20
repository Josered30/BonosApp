import React, { Suspense } from 'react';
import { Route, Redirect } from "react-router-dom";
import { Spinner } from '../../components/Spinner';
import { useAuth } from '../contexts/AuthContext';

function LogoutGuard(props: any) {

    // keep in mind path is required as a prop
    const { path, children, ...rest } = props;
    // using the AuthContext to get the state variable isAuthenticated
    const { authState } = useAuth();

    return (
        <Route
            exact
            path={path}
            {...rest}
            render={({ location }) =>
                !authState.state ? (
                    children
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                )
            }
        />
    );
}

export default LogoutGuard;
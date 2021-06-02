import { Container } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import AppNavBar from '../components/AppNavBar';





const AppLayout = ({ component: Component, ...props }: any) => {
    return (
        <div>
            <AppNavBar></AppNavBar>
            <Container>
                <Component {...props} />
            </Container>
        </div>
    );
};

export default AppLayout;
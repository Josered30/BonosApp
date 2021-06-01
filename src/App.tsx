import React, { lazy, Suspense } from 'react';


import './App.css';
import InitialForm from './components/InitialForm';
import { AppBar, Container, Link as StyledLink, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import { SpinnerProvider, useSpinner } from './contexts/SpinnerContext';
import {SpinnerDisplay, Spinner } from './components/Spinner';


const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)

  },
}));


function App() {

  const [logged, setLogin] = React.useState(false);
  const classes = useStyle();


  if (logged) {
    return <InitialForm setLogin={setLogin}></InitialForm>
  }

  const Home = lazy(() => import("./components/Home"));



  return (

    <BrowserRouter>

      <SpinnerProvider>

        <AppNavBar></AppNavBar>
        <Container>
          <Switch>
            <Route path="/">
              <Suspense fallback={Spinner}>
                <Home />
              </Suspense>
            </Route>
            <Route path="/calculator">
            </Route>
            <Route path="/buysell">
            </Route>
            <Route path="/configuration">
            </Route>
          </Switch>

          <SpinnerDisplay/>

        </Container>
      </SpinnerProvider>


    </BrowserRouter>



  );
}

export default App;

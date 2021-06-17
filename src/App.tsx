import { lazy, Suspense } from 'react';


import './App.css';
import InitialForm from './components/InitialForm';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { SpinnerProvider, useSpinner } from './contexts/SpinnerContext';
import { SpinnerDisplay, Spinner } from './components/Spinner';
import LoginGuard from './guards/LoginGuard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginLayout from './layouts/LoginLayout';
import LogoutGuard from './guards/LogoutGuard';

const Home = lazy(() => import("./components/Home"));
const Calculator = lazy(() => import("./components/Calculator"));
const BuySell = lazy(() => import("./components/BuySell"));


function App() {

  return (
    <Suspense fallback={<Spinner></Spinner>}>
      <SpinnerProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>

          <LogoutGuard path="/login">
            <LoginLayout component={InitialForm} />
          </LogoutGuard>

          <LoginGuard path="/home">
            <AppLayout component={Home}></AppLayout>
          </LoginGuard>

          <LoginGuard path="/calculator">
            <AppLayout component={Calculator}></AppLayout>
          </LoginGuard>

          <LoginGuard path="/buysell">
            <AppLayout component={BuySell}></AppLayout>
          </LoginGuard>

        </Switch>
        <SpinnerDisplay />
      </SpinnerProvider>
    </Suspense>

  );
}

export default App;

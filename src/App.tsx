import { lazy, Suspense } from 'react';


import './App.css';
import InitialForm from './components/InitialForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SpinnerProvider } from './core/contexts/SpinnerContext';
import { SpinnerDisplay, Spinner } from './components/Spinner';
import LoginGuard from './core/guards/LoginGuard';
import AppLayout from './layouts/AppLayout';
import LoginLayout from './layouts/LoginLayout';
import LogoutGuard from './core/guards/LogoutGuard';

const Home = lazy(() => import("./components/Home"));
const Calculator = lazy(() => import("./components/Calculator"));
const BuySell = lazy(() => import("./components/BuySell"));
const Profile = lazy(() => import('./components/Profile'));
const BondPublication = lazy(() => import('./components/BondPublication'));
const BondEmisssion = lazy(() => import('./components/BondEmission'));

function App() {

  return (
    <Suspense fallback={<Spinner />}>
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

          <LoginGuard path="/profile">
            <AppLayout component={Profile}></AppLayout>
          </LoginGuard>


          <LoginGuard path={'/bondPublication/:bondPublicationId'}>
            <AppLayout component={BondPublication}></AppLayout>
          </LoginGuard>

          <LoginGuard path={'/bondEmission'}>
            <AppLayout component={BondEmisssion}></AppLayout>
          </LoginGuard>

        </Switch>
        <SpinnerDisplay />
      </SpinnerProvider>
    </Suspense>

  );
}

export default App;

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
const Configuration = lazy(() => import('./components/Configuration'));
const BondPublication = lazy(() => import('./components/BondPublish'));

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

          <LoginGuard path="/configuration">
            <AppLayout component={Configuration}></AppLayout>
          </LoginGuard>


          <LoginGuard path={'/bondPublication/:bondPublicationId'}>
            <AppLayout component={BondPublication}></AppLayout>
          </LoginGuard>


        </Switch>
        <SpinnerDisplay />
      </SpinnerProvider>
    </Suspense>

  );
}

export default App;

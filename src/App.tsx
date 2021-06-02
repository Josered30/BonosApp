import { lazy, Suspense } from 'react';


import './App.css';
import InitialForm from './components/InitialForm';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { SpinnerProvider, useSpinner } from './contexts/SpinnerContext';
import { SpinnerDisplay, Spinner } from './components/Spinner';
import LoginGuard from './guards/LoginGuard';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginLayout from './layouts/LoginLayout';




function App() {

  const Home = lazy(() => import("./components/Home"));

  return (
    
    <Suspense fallback={<Spinner></Spinner>}>
      <AuthProvider>
        <SpinnerProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>


            <Route exact path="/login">
              <LoginLayout component={InitialForm} />
            </Route>

            <LoginGuard path="/home">
              <AppLayout component={Home}></AppLayout>
            </LoginGuard>

          </Switch>
          <SpinnerDisplay/>
        </SpinnerProvider>
      </AuthProvider>
    </Suspense>

  );
}

export default App;

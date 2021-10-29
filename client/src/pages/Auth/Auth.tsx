import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';

import { AuthPropsFromRedux } from '../../containers/pages/Auth';

import styles from './Auth.module.scss';

const Auth: FC<AuthPropsFromRedux> = ({ login, signup, isSignupSuccess, isAuth }) => {
  const match = useRouteMatch();

  return (
    <section className={styles.Container}>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Redirect exact from={`${match.path}`} to={`${match.path}/connexion`} />
              <Route
                exact
                path={`${match.path}/connexion`}
                render={(routeProps) => <Login {...routeProps} isAuth={isAuth} login={login} />}
              />
              <Route
                path={`${match.path}/inscription`}
                render={(routeProps) => (
                  <Signup {...routeProps} isSignupSuccess={isSignupSuccess} signup={signup} />
                )}
              />
            </Switch>
          </AnimatePresence>
        )}
      />
    </section>
  );
};

export default Auth;

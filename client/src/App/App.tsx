import { FC, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from '../containers/hoc/ProtectedRoute';

import { AppPropsFromRedux } from '../containers/App/App';
import Loading from '../components/Loading/Loading';
import Auth from '../containers/pages/Auth';
import Public from '../pages/Public/Public';

const App: FC<AppPropsFromRedux> = ({ checkAuth, wsConnect }) => {
  const [state, setState] = useState({ isLoading: true });

  useEffect(() => {
    wsConnect();
    checkAuth();
  }, [checkAuth, wsConnect]);

  return (
    <>
      {state.isLoading ? (
        <Loading
          initial
          onAnimationStart={() => setState((prevState) => ({ ...prevState, isLoading: true }))}
          onAnimationEnd={() => setState((prevState) => ({ ...prevState, isLoading: false }))}
        />
      ) : null}
      <Switch>
        <Route path="/auth" component={Auth} />
        <ProtectedRoute redirectionRoute="/auth" path="/" component={Public} />
      </Switch>
    </>
  );
};

export default App;

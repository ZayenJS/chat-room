import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { ProtectedRoutePropsFromRedux } from '../../containers/hoc/ProtectedRoute';

const ProtectedRoute: FC<ProtectedRoutePropsFromRedux> = ({
  component: Component,
  isAuth,
  hasTriedToAuth,
  path,
  exact = false,
  redirectionRoute,
  ...rest
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        if (!hasTriedToAuth) return <Loading />;

        if (isAuth) return <Component {...routeProps} />;

        return <Redirect to={redirectionRoute} />;
      }}
    />
  );
};

export default ProtectedRoute;

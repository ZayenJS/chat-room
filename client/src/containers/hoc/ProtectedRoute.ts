import { connect } from 'react-redux';
// import {  } from '../../store/actions';
import ProtectedRoute from '../../hoc/ProtectedRoute/ProtectedRoute';
import { Dispatch } from 'react';
import { State } from '../../store/reducers';
import { AnyAction } from 'redux';

interface StateToProps {
  isAuth: boolean;
  hasTriedToAuth: boolean;
}

interface ownProps {
  component: any;
  redirectionRoute: string;
  path: string;
  exact?: boolean;
}

interface DispatchToProps {}

const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({
  isAuth: !!state.user.user,
  hasTriedToAuth: state.auth.hasTriedToAuth,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({});

export type ProtectedRoutePropsFromRedux = StateToProps & DispatchToProps & ownProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

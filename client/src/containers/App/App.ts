import { connect } from 'react-redux';
import { AuthActions, checkAuth, SocketActions, wsConnect } from '../../store/actions';
import App from '../../App/App';
import { Dispatch } from 'react';
import { State } from '../../store/reducers';
import { ChatActions } from '../../store/actions/chat';

interface ownProps {}

interface StateToProps {
  isAuth: boolean;
  hasTriedToAuth: boolean;
}

interface DispatchToProps {
  checkAuth: () => void;
  wsConnect: () => void;
}

const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({
  isAuth: !!state.user.user,
  hasTriedToAuth: state.auth.hasTriedToAuth,
});

const mapDispatchToProps = (
  dispatch: Dispatch<SocketActions | AuthActions | ChatActions>,
): DispatchToProps => ({
  checkAuth: () => dispatch(checkAuth()),
  wsConnect: () => dispatch(wsConnect()),
});

export type AppPropsFromRedux = StateToProps & DispatchToProps & ownProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);

import { connect } from 'react-redux';
import { AuthActions, login, signup, SocketActions } from '../../store/actions';
import Auth from '../../pages/Auth/Auth';
import { Dispatch } from 'react';
import { State } from '../../store/reducers';
import { ChatActions } from '../../store/actions/chat';

interface ownProps {}

interface StateToProps {
  isSignupSuccess: boolean;
  isAuth: boolean;
}

interface DispatchToProps {
  login: () => void;
  signup: () => void;
}

const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({
  isSignupSuccess: !!state.auth.signupSuccess,
  isAuth: !!state.user.user,
});

const mapDispatchToProps = (
  dispatch: Dispatch<SocketActions | AuthActions | ChatActions>,
): DispatchToProps => ({
  login: () => dispatch(login()),
  signup: () => dispatch(signup()),
});

export type AuthPropsFromRedux = StateToProps & DispatchToProps & ownProps;

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

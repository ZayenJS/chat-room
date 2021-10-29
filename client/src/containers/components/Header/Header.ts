import { connect } from 'react-redux';
import { State } from '../../../store/reducers';

import Header from '../../../components/Header/Header';
import { Dispatch } from 'react';
import { AuthActions, logout } from '../../../store/actions';

interface OwnProps {}

interface StateToProps {}

interface DispatchToProps {
  logout: () => void;
}

const mapStateToProps = (state: State & any, ownProps: OwnProps): StateToProps => ({});

const mapDispatchToProps = (
  dispatch: Dispatch<AuthActions>,
  ownProps: OwnProps,
): DispatchToProps => ({ logout: () => dispatch(logout()) });

export type HeaderPropsFromRedux = StateToProps & DispatchToProps & OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);

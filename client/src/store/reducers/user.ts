import { User } from '../../models/User';
import { AuthActions, CHECK_AUTH, LOGIN, LOGOUT } from '../actions';

export interface UserReducerState {
  user: User | null;
}

const INITIAL_STATE: UserReducerState = { user: null };

const reducer = (
  state: UserReducerState = INITIAL_STATE,
  action: AuthActions,
): UserReducerState => {
  switch (action.type) {
    case CHECK_AUTH:
    case LOGIN:
      return {
        ...state,
        user: action.user ?? null,
      };
    case LOGOUT:
      return {
        ...state,
        user: action.isLoggedOut ? null : state.user,
      };
    default:
      return state;
  }
};

export default reducer;

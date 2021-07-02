import { AuthActions, CHECK_AUTH, GlobalActions, INPUT_CHANGE, LOGIN, SIGNUP } from '../actions';
import { Error } from '../../models/ApiError';

export interface AuthReducerState {
  hasTriedToAuth: boolean;
  username: string;
  email: string;
  emailOrUsername: string;
  password: string;
  signupSuccess?: boolean;
  errors: Error[];
}

const INITIAL_STATE: AuthReducerState = {
  hasTriedToAuth: false,
  username: '',
  email: '',
  emailOrUsername: '',
  password: '',
  errors: [],
};

const reducer = (
  state: AuthReducerState = INITIAL_STATE,
  action: AuthActions | GlobalActions,
): AuthReducerState => {
  switch (action.type) {
    case INPUT_CHANGE:
      if (action.reducerName === 'auth') {
        return {
          ...state,
          [action.name]: action.value,
        };
      }
      return state;
    case CHECK_AUTH:
      return {
        ...state,
        hasTriedToAuth: true,
      };
    case LOGIN:
      return {
        ...state,
        errors: action.errors ?? [],
      };
    case SIGNUP:
      return {
        ...state,
        signupSuccess: action.errors?.length === 0,
        errors: action.errors ?? [],
      };

    default:
      return state;
  }
};

export default reducer;

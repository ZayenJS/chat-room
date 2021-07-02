import { Error } from '../../models/ApiError';
import { User } from '../../models/User';

export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';

export interface CheckAuthAction {
  type: typeof CHECK_AUTH;
  user?: User | null;
}

export interface LoginAction {
  type: typeof LOGIN;
  user?: User;
  errors?: Error[];
}

export interface SignupAction {
  type: typeof SIGNUP;
  errors?: Error[];
}

export const checkAuth = (user?: User | null): CheckAuthAction => ({ type: CHECK_AUTH, user });
export const login = (user?: User, errors?: Error[]): LoginAction => ({
  type: LOGIN,
  user,
  errors,
});
export const signup = (errors?: Error[]): SignupAction => ({ type: SIGNUP, errors });

export type AuthActions = CheckAuthAction | LoginAction | SignupAction;

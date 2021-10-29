import { AuthActions, CHECK_AUTH, LOGIN, LOGOUT, SIGNUP } from '../actions';
import { MiddlewareAPI, Dispatch } from 'redux';
import { gql } from '@apollo/client';

import { apolloClient } from '../../utils/apollo';
import { State } from '../reducers';
import { Error } from '../../models/ApiError';

export const authMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch<AuthActions>) => async (action: AuthActions) => {
    const { auth } = store.getState() as State;

    switch (action.type) {
      case CHECK_AUTH: {
        try {
          const { data } = await apolloClient.query({
            query: gql`
              query checkAuth {
                checkAuth {
                  errors {
                    type
                    message
                  }
                  user {
                    id
                    username
                    email
                  }
                }
              }
            `,
          });

          action.user = data.checkAuth.user ?? null;
          next(action);
        } catch (e) {
          console.log(e);
        }
        break;
      }
      case LOGIN: {
        try {
          const { data } = await apolloClient.mutate({
            mutation: gql`
							mutation login {
								login(data: { emailOrUsername: "${auth.emailOrUsername}", password: "${auth.password}" }) {
									errors {
										type
										field
										message
									}
									user {
										id
										username
										email
									}
								}
							}
						`,
          });

          console.log({ errors: data.login.errors });

          action.user = data.login.user;
          action.errors = data.login.errors;
        } catch (e) {
          console.log(e);
        }

        next(action);
        break;
      }
      case LOGOUT: {
        try {
          const { data } = await apolloClient.mutate({
            mutation: gql`
              mutation logout {
                logout
              }
            `,
          });

          action.isLoggedOut = data.logout;
        } catch (e) {
          console.log(e);
        }

        next(action);
        break;
      }
      case SIGNUP: {
        try {
          const { data } = await apolloClient.mutate({
            mutation: gql`
							mutation signup {
								signup(params: { username: "${auth.username}", email: "${auth.email}", password: "${auth.password}" }) {
									type
									field
									message
								}
							}
						`,
          });

          action.errors = data.signup as unknown as Error[];

          next(action);
        } catch (e) {
          console.log(e);
        }
        break;
      }
      default:
        next(action);
    }
  };

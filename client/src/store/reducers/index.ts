import { combineReducers } from 'redux';
/* import your reducers here */
import auth, { AuthReducerState } from './auth';
import chat, { ChatReducerState } from './chat';
import user, { UserReducerState } from './user';
export interface State {
  auth: AuthReducerState;
  user: UserReducerState;
  chat: ChatReducerState;
}

const reducer = combineReducers({ auth, user, chat });

export default reducer;

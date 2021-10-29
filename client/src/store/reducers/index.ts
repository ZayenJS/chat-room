import { combineReducers } from 'redux';
/* import your reducers here */
import auth, { AuthReducerState } from './auth';
import chat, { ChatReducerState } from './chat';
import user, { UserReducerState } from './user';
import pages, { PagesReducerState } from './pages';
export interface State {
  auth: AuthReducerState;
  user: UserReducerState;
  chat: ChatReducerState;
  pages: PagesReducerState;
}

const reducer = combineReducers({ auth, user, chat, pages });

export default reducer;

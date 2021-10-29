import { PageName } from '../../models/Page';
import { PagesActions } from '../actions';
import { MARK_VISITED } from '../actions/pages';

export type PagesReducerState = {
  [key in PageName]: boolean;
};

const INITIAL_STATE: PagesReducerState = {
  home: false,
  login: false,
  signup: false,
};

const reducer = (
  state: PagesReducerState = INITIAL_STATE,
  action: PagesActions,
): PagesReducerState => {
  switch (action.type) {
    case MARK_VISITED:
      return {
        ...state,
        [action.page]: true,
      };
    default:
      return state;
  }
};

export default reducer;

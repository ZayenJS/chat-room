import { PageName } from '../../models/Page';

export const MARK_VISITED = 'MARK_VISITED';

export interface MarkVisitedAction {
  type: typeof MARK_VISITED;
  page: PageName;
}

export const markVisited = (page: PageName): MarkVisitedAction => ({ type: MARK_VISITED, page });

export type PagesActions = MarkVisitedAction;

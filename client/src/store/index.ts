import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { socketMiddleware, authMiddleware, chatMiddleware } from './middlewares';

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancers = composeEnhancers(
  applyMiddleware(socketMiddleware, authMiddleware, chatMiddleware),
);

const store = createStore(rootReducer, enhancers);

export default store;

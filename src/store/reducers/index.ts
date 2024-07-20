import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import menu from './menu';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  menu,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;

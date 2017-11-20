import { combineReducers } from 'redux';
import events from './events';
import user from './user';
import categories from './categories';

export default combineReducers({ events, user, categories });

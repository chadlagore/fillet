import { combineReducers } from 'redux';
import events from './events';
import user from './user';

export default combineReducers({ events, user });

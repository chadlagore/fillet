import { combineReducers } from 'redux';
import events from './events';
import user from './user';
import eventDetail from './eventDetail';

export default combineReducers({ events, user, eventDetail });

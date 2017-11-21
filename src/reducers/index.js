import { combineReducers } from 'redux';
import events from './events';
import user from './user';
import eventDetail from './event-detail';
import rsvp from './rsvp';

export default combineReducers({ events, user, eventDetail, rsvp });

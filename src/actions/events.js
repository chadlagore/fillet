import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'ADD',
    'CLEAR'
], 'EVENTS'));

/* ACTION CREATORS */
export const addEvents = events => ({ type: types.EVENTS_ADD, payload: events });

export const clearEvents = () => ({ type: types.EVENTS_CLEAR });

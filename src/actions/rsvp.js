// Actions for creating RSVPs

import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'ADD',
    'DELETE'
], 'RSVP'));

/* ACTION CREATORS */
export const rsvp = event => ({ type: types.RSVP_ADD, payload: event });

export const unrsvp = event => ({ type: types.RSVP_DELETE, payload: event });

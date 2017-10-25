import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'SET_LOCATION',
    'CLEAR'
], 'USER'));

/* ACTION CREATORS */
export const setLocation = loc => ({ type: types.USER_SET_LOCATION, payload: loc });

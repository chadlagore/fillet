import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'SET',
    'SET_TOKEN',
    'SET_LOCATION',
    'CLEAR'
], 'USER'));

/* ACTION CREATORS */
export const setUser = user => ({ type: types.USER_SET, payload: user });
export const setAuthToken = authToken => ({ type: types.USER_SET_TOKEN, payload: authToken });
export const setLocation = loc => ({ type: types.USER_SET_LOCATION, payload: loc });

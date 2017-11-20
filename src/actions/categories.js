import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'ADD'
], 'CATEGORIES'));

/* ACTION CREATORS */
export const addCategories = categories => ({ type: types.CATEGORIES_ADD, payload: categories });

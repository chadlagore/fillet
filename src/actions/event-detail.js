import { mirror, prepend } from './../util';

/* ACTION TYPES */
export const types = mirror(prepend([
    'SHOW_MODAL',
    'HIDE_MODAL'
], 'EVENT_DETAIL'));

/* ACTION CREATORS */
export const showModal = () => ({ type: types.EVENT_DETAIL_SHOW_MODAL });

export const hideModal = () => ({ type: types.EVENT_DETAIL_HIDE_MODAL });

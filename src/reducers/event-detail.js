// Controls state for the EventDetail screen

import { types } from './../actions/event-detail';

// Describes the initial state when the app starts up
const initialState = {
    modalVisible: false
};

export default (state = initialState, { type }) => {
    switch (type) {
        case types.EVENT_DETAIL_SHOW_MODAL:
            return { modalVisible: true };
        case types.EVENT_DETAIL_HIDE_MODAL:
            return { modalVisible: false };
        default:
            return state;
    }
};

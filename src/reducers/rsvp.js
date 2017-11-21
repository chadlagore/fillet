// Controls state for the EventDetail screen

import { types } from './../actions/rsvp';

// Describes the initial state when the app starts up
// Maps eventName->Bool
const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.RSVP_ADD:
            return { ...state, [payload]: true };
        case types.RSVP_DELETE:
            return { ...state, [payload]: false };
        default:
            return state;
    }
};

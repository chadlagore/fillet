
import { types } from './../actions/events';

// Describes the initial state when the app starts up
const initialState = {
    events: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // Add the events to the store
        case types.EVENTS_ADD:
            return { ...state, events: [...state.events, payload] };
        // Clear all events from the store
        case types.EVENTS_CLEAR:
            return { ...state, events: [] };
        default:
            return state;
    }
};

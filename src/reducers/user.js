
import { types } from './../actions/user';

// Describes the initial state when the app starts up
const initialState = {
    user: undefined
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // Add the events to the store
        case types.USER_SET:
            return { ...state, user: payload };
        case types.USER_SET_TOKEN:
            return { ...state, token: payload };
        default:
            return state;
    }
};

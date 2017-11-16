import { types } from './../actions/user';

// Describes the initial state when the app starts up
const initialState = {
    user: undefined,
    location: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // Add the events to the store
        case types.USER_SET:
            return { ...state, user: payload };
        case types.USER_SET_TOKEN:
            return { ...state, token: payload };
        // Add the user's current location to the store
        case types.USER_SET_LOCATION:
            return { ...state, location: payload };
        default:
            return state;
    }
};

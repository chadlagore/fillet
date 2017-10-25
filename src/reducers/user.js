import { types } from './../actions/user';

// Describes the initial state when the app starts up
const initialState = {
    location: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // Add the user's current location to the store
        case types.USER_SET_LOCATION:
            return { ...state, location: payload };
        default:
            return state;
    }
};

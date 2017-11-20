import { types } from './../actions/categories';

// Describes the initial state when the app starts up
const initialState = {
    categories: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // Add the categories to the store
        case types.CATEGORIES_ADD:
            return { ...state, categories: [...payload] };
    }
};

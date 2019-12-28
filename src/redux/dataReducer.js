import {SET_ERRORS} from "./types";


const initialState={

};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {};
        default:
            return state
    }
};
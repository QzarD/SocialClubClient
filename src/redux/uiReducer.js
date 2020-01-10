import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS, STOP_LOADING_UI} from "./types";

const initialState={
    loading:false,
    errors:{},
    completePostScream: false
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {...state, loading: false, errors: action.payload};
        case CLEAR_ERRORS:
            return {...state, loading: false, errors: {}, completePostScream: true};
        case LOADING_UI:
            return {...state, loading: true, completePostScream: false};
        case STOP_LOADING_UI:
            return {...state, loading: false};
        default:
            return state
    }
};
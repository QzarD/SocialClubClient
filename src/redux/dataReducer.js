import {
    CLEAR_ERRORS,
    DELETE_SCREAM,
    LIKE_SCREAM,
    LOADING_DATA, LOADING_UI, POST_SCREAM, SET_ERRORS,
    SET_SCREAMS,
    UNLIKE_SCREAM
} from "./types";
import axios from 'axios';


const initialState={
    screams:[],
    scream:{},
    loading:false
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {...state, loading: true};
        case SET_SCREAMS:
            return {...state, screams: action.payload, loading: false};
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index=state.screams.findIndex(scream=>scream.screamId === action.payload.screamId);
            state.screams[index]=action.payload;
            return {...state};
        case DELETE_SCREAM:
            let indexDel=state.screams.findIndex(scream=>scream.screamId === action.payload);
            state.screams.splice(indexDel, 1);
            return {...state};
        case POST_SCREAM:
            return {...state, screams:
                [action.payload, ...state.screams]};
        default:
            return state
    }
};

export const getScreams = () =>(dispatch)=> {
    dispatch({type: LOADING_DATA});
    axios.get('/screams')
        .then(res=>{
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
};
export const likeScream = (screamId) =>dispatch=>{
    axios.get(`/scream/${screamId}/like`)
        .then(res=>{
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err=> console.log(err))
};
export const unlikeScream = (screamId) =>dispatch=>{
    axios.get(`/scream/${screamId}/unlike`)
        .then(res=>{
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err=> console.log(err))
};
export const deleteScream = (screamId) => dispatch=>{
    axios.delete(`/scream/${screamId}`)
        .then(()=>{
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch(err=> console.log(err))
};
export const postScream=(newScream)=>dispatch=>{
    dispatch({type: LOADING_UI});
    axios.post('/scream', newScream)
        .then(res=>{
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS})
        })
        .catch(err=> {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};
export const clearErrors=()=>dispatch=>{
    dispatch({type: CLEAR_ERRORS})
}
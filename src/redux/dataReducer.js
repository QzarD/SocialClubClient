import {
    LIKE_SCREAM,
    LOADING_DATA,
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
            let index=state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId);
            state.screams[index]=action.payload;
            return {...state};
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
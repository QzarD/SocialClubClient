import axios from "axios";

const SET_AUTHENTICATED='SocialClubClient/userReducer/SET_AUTHENTICATED';
const SET_UNAUTHENTICATED='SocialClubClient/userReducer/SET_UNAUTHENTICATED';
const SET_USER='SocialClubClient/userReducer/SET_USER';
const LOADING_USER='SocialClubClient/userReducer/LOADING_USER';
const LOADING_UI='SocialClubClient/uiReducer/LOADING_UI';
const SET_ERRORS='SocialClubClient/uiReducer/SET_ERRORS';
const CLEAR_ERRORS='SocialClubClient/uiReducer/CLEAR_ERRORS';

const initialState={
    authenticated: false,
    credentials:{},
    likes:[],
    notifications:[]
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {...state, authenticated: true};
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        default:
            return state
    }
};

export const loginUser=(userData, history)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
        .then(res=>{
            const FBIdToken=`Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            axios.defaults.headers.common['Authorization']=FBIdToken;
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
        })
        .catch(err=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

const getUserData=()=>(dispatch)=>{
    axios.get('/user')
        .then(res=>{
            dispatch({
                type: SET_USER,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
};
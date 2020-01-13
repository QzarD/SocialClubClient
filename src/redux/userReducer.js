import axios from "axios";
import {
    CLEAR_ERRORS,
    LIKE_SCREAM,
    LOADING_UI,
    LOADING_USER, MARK_NOTIFICATIONS_READ,
    SET_AUTHENTICATED,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER, UNLIKE_SCREAM
} from "./types";


const initialState={
    authenticated: false,
    loading:false,
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
                loading:false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state, loading:true
            };
        case LIKE_SCREAM:
            return {
                ...state, likes:[
                    ...state.likes, {
                    userHandle: state.credentials.handle,
                    screamId: action.payload.screamId
                    }
                ]
            };
        case UNLIKE_SCREAM:
            return {
                ...state, likes: state.likes.filter(
                    like=>like.screamId!==action.payload.screamId
                )
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not=>not.read=true);
            return {...state};
        default:
            return state
    }
};

export const loginUser=(userData, history)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
        .then(res=>{
            setAuthorizationHeader(res.data.token);
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
export const signupUser=(newUserData, history)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/signup', newUserData)
        .then(res=>{
            setAuthorizationHeader(res.data.token);
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
export const logoutUser=()=>(dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
};
export const getUserData=()=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.get('/user')
        .then(res=>{
            dispatch({
                type: SET_USER,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
};
export const uploadImage=(formData)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('/user/image', formData)
        .then(res=>{
            dispatch(getUserData())
        })
        .catch(err=>console.log(err))
};
export const editUserDetails=(userDetails)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('/user', userDetails)
        .then(res=>{
            dispatch(getUserData())
        })
        .catch(err=>console.log(err))
};
export const markNotificationsRead=(notificationIds)=>dispatch=>{
    axios.post('/notifications', notificationIds)
        .then(res=>{
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch(err=>console.log(err))
};


const setAuthorizationHeader=(token)=>{
    const FBIdToken=`Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization']=FBIdToken;
};
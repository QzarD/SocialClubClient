import React from 'react';
import {useHistory} from 'react-router-dom';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import {getUserData, logoutUser} from "./redux/userReducer";
import {SET_AUTHENTICATED} from "./redux/types";
import axios from "axios";
import store from './redux/store'

const theme = createMuiTheme(themeFile);

const token=localStorage.FBIdToken;
if(token){
    const decodedToken=jwtDecode(token);
    if(decodedToken.exp*1000<Date.now()){
        store.dispatch(logoutUser());
        window.location.href='/login';
        console.log('false')
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization']=token;
        store.dispatch(getUserData());
        console.log('true')
    }
}

export default function App() {
    let history=useHistory();

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <AuthRoute exact path='/login' component={Login}/>
                        <AuthRoute exact path='/signup' component={Signup}/>
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    );
}


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

const theme = createMuiTheme(themeFile);

let authenticated;
const token=localStorage.FBIdToken;
if(token){
    const decodedToken=jwtDecode(token);
    if(decodedToken.exp*1000<Date.now()){
        window.location.href='/login';
        authenticated = false;
        console.log('false')
    } else {
        authenticated=true;
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
                        <AuthRoute exact path='/login' component={Login} authenticated={authenticated}/>
                        <AuthRoute exact path='/signup' component={Signup} authenticated={authenticated}/>
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    );
}


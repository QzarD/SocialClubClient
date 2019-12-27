import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import imgAppIco from "../images/unnamed.jpg";
import {TextField, Typography, Button, CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import {loginUser} from "../redux/userReducer";
import {connect} from "react-redux";

const styles = {
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto',
        maxHeight: '70px',
        borderRadius: '50px'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};

function Login({classes, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        loginUser(userData, history)
    };

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={imgAppIco} alt='icon' className={classes.image}/>
                <Typography variant='h2' className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id='email' name='email' type='email'
                               label='Email' className={classes.textField}
                               value={email} onChange={e => {
                        setEmail(e.target.value)
                    }}
                               fullWidth helperText={errors.email}
                               error={!!errors.email}
                    />
                    <TextField id='password' name='password' type='password'
                               label='Password' className={classes.textField}
                               value={password} onChange={e => {
                        setPassword(e.target.value)
                    }}
                               fullWidth helperText={errors.password}
                               error={!!errors.password}
                    />
                    {errors.general &&
                    <Typography variant='body2' className={classes.customError}>
                        {errors.general}
                    </Typography>
                    }
                    <Button type='submit' variant='contained' color='primary'
                            className={classes.button} disabled={loading}
                    >
                        Login
                        {loading && <CircularProgress size={25} className={classes.progress}/>}
                    </Button> <br/>
                    <small>Dont have an account? <Link to='/singup'>Singup</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps =(state)=> ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login));
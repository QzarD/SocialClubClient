import React, {useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import imgAppIco from "../images/unnamed.jpg";
import {TextField, Typography, Button, CircularProgress} from "@material-ui/core";
import axios from "axios";
import {Link} from "react-router-dom";

const styles={
    typography:{
        useNextVariants: true
    },
    form:{
        textAlign:'center'
    },
    image:{
        margin: '20px auto 20px auto',
        maxHeight: '70px',
        borderRadius:'50px'
    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop: 20,
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    }
};

function Signup({classes, history}) {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [handle, setHandle]=useState('');
    const [loading, setLoading]=useState(false);
    const [errors, setErrors]=useState({});
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        const newUserData={
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            handle:handle,
        };
        axios.post('/signup', newUserData)
            .then(res=>{
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                setLoading(false);
                history.push('/')
            })
            .catch(err=>{
                setErrors(err.response.data);
                setLoading(false);
            })
    };

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={imgAppIco} alt='icon' className={classes.image}/>
                <Typography variant='h2' className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id='email' name='email' type='email'
                               label='Email' className={classes.textField}
                               value={email} onChange={e=>{setEmail(e.target.value)}}
                               fullWidth helperText={errors.email}
                               error={!!errors.email}
                    />
                    <TextField id='password' name='password' type='password'
                               label='Password' className={classes.textField}
                               value={password} onChange={e=>{setPassword(e.target.value)}}
                               fullWidth helperText={errors.password}
                               error={!!errors.password}
                    />
                    <TextField id='confirmPassword' name='confirmPassword' type='password'
                               label='confirmPassword' className={classes.textField}
                               value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}}
                               fullWidth helperText={errors.confirmPassword}
                               error={!!errors.confirmPassword}
                    />
                    <TextField id='handle' name='handle' type='text'
                               label='handle' className={classes.textField}
                               value={handle} onChange={e=>{setHandle(e.target.value)}}
                               fullWidth helperText={errors.handle}
                               error={!!errors.handle}
                    />
                    {errors.general &&
                    <Typography variant='body2' className={classes.customError}>
                        {errors.general}
                    </Typography>
                    }
                    <Button type='submit' variant='contained' color='primary'
                            className={classes.button} disabled={loading}
                    >
                        Signup
                        {loading && <CircularProgress size={25} className={classes.progress}/>}
                    </Button> <br/>
                    <small>Already have an account? <Link to='/login'>Login</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}

Signup.propTypes={
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup)
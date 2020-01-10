import React, {useEffect, useState} from 'react';
import {CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MyButton from "../util/MyButton";
import {Add, Close} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {clearErrors, postScream} from "../redux/dataReducer";

const styles={
    submitButton:{
        position:'relative',
        float:'right',
        marginTop: 10
    },
    progressSpinner:{
        position: 'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'90%',
        top:'6%'
    }
};

const PostScream=({classes, UI:{loading, errors, completePostScream}, postScream, clearErrors})=>{
    const [open, setOpen]=useState(false);
    const [body, setBody]=useState('');
    const [error, setError]=useState(null);
    const handleOpen=()=>{
        setOpen(!open)
    };
    const handleClose=()=>{
        setOpen(false);
        setBody('');
        if (error) {
            clearErrors();
            setError(null)
        }
    };
    const handleChange=(e)=>{
        setBody(e.target.value)
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        postScream({body: body});
    };
    useEffect(()=>{
        setError(errors.body)
    },[errors.body]);
    useEffect(()=>{
        if (completePostScream){
            handleClose()
        }
    },[errors]);

    return (
        <>
            <MyButton onClick={handleOpen} tip='Post a scream!'>
                <Add/>
            </MyButton>
            <Dialog open={open} onClose={()=>setOpen(false)}
                    fullWidth maxWidth='sm'>
                <MyButton tip='Close' onClick={handleClose}
                          tipClassName={classes.closeButton}>
                    <Close/>
                </MyButton>
                <DialogTitle>
                    Post a new scream
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name='body' type='text' label='scream'
                                   multiline rows='3' placeholder='Scream at your fellow apes'
                                   error={error} helperText={error ? error : null}
                                   className={classes.textField} onChange={handleChange}
                                   fullWidth/>
                                   <Button type='submit' variant='contained' color='primary'
                                           className={classes.submitButton} disabled={loading}>
                                       Submit
                                       {loading && <CircularProgress size={30} className={classes.progressSpinner}/>
                                       }
                                   </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
};

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    completePostScream:state.data.completePostScream
});

export default connect (mapStateToProps,{postScream, clearErrors})(withStyles(styles)(PostScream))
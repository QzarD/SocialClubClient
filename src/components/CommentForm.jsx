import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {clearErrors, submitComment} from "../redux/dataReducer";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
    progressSpinner:{
        position: 'absolute'
    }
};

function CommentForm({classes, screamId, authenticated, submitComment, UI: {errors, loading, completePostScream},
                         loadingComment, clearErrors}) {
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const handleClose=()=>{
        setBody('');
        if (error) {
            clearErrors();
            setError(null)
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        submitComment(screamId, {body: body})
    };
    useEffect(() => {
        setError(errors.comment)
    }, [errors.comment]);
    useEffect(()=>{
        if (completePostScream){
            handleClose()
        }
    },[errors]);

    return (
        <>
            {authenticated && <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={handleSubmit}>
                    <TextField name='body' type='text' label='Comment on scream'
                               error={error} helperText={error ? error : null}
                               value={body} onChange={e => setBody(e.target.value)}
                               fullWidth className={classes.textField}/>
                    <Button type='submit' variant='contained' color='primary'
                            className={classes.button} disabled={loadingComment}>
                        Submit
                        {loadingComment && <CircularProgress size={30} className={classes.progressSpinner}/>
                        }
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
            }
        </>
    )

}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
    loadingComment: state.data.loadingComment
});

export default connect(mapStateToProps, {submitComment, clearErrors})(withStyles(styles)(CommentForm))

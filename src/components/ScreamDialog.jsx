import React, {useEffect, useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {clearErrors, getScream} from "../redux/dataReducer";
import MyButton from "../util/MyButton";
import {Chat, Close, UnfoldMore} from "@material-ui/icons";
import {CircularProgress, Dialog, DialogContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Link from "@material-ui/core/Link";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton: {
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop:50,
        marginBottom:50
    },
    visibleSeparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }
};

function ScreamDialog({
                          openDialog, classes, scream: {
        body, createdAt, likeCount,
        commentCount, userImage, userHandle, comments
    }, UI: {loading}, screamId, getScream, clearErrors
                      }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
        getScream(screamId)
    };
    const handleClose = () => {
        setOpen(!open);
        clearErrors();
    };
    useEffect(()=>{
        if(openDialog){
            handleOpen()
        }
    },[]);

    return (
        <>
            <MyButton onClick={handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
                <UnfoldMore color='primary'/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
                    <Close/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {loading
                        ? <div className={classes.spinnerDiv}>
                            <CircularProgress size={100} thickness={2}/>
                        </div>
                        : <Grid container spacing={16} className={classes.cardScream}>
                            <Grid item sm={5}>
                                <img src={userImage} alt='Profile' className={classes.profileImage}/>
                            </Grid>
                            <Grid item sm={7}>
                                <Typography component={Link} color='primary' varyant='h5'
                                            to={`/users/${userHandle}`}>
                                    @{userHandle}
                                </Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variant='body2' color='textSecondary'>
                                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variant='body1'>
                                    {body}
                                </Typography>
                                <LikeButton screamId={screamId}/>
                                <span>{likeCount} likes</span>
                                <MyButton tip='Comments'>
                                    <Chat color='primary'/>
                                </MyButton>
                                <span>{commentCount} comments</span>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>
                            <CommentForm screamId={screamId}/>
                            <Comments comments={comments}/>
                        </Grid>
                    }
                </DialogContent>
            </Dialog>
        </>
    );
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    scream: state.data.scream
});

export default connect(mapStateToProps, {getScream, clearErrors})(withStyles(styles)(ScreamDialog))

import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Card, CardMedia, CardContent, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {likeScream, unlikeScream} from "../redux/dataReducer";
import MyButton from "../util/MyButton";
import {Chat, Favorite, FavoriteBorder} from "@material-ui/icons";
import DeleteScream from "./DeleteScream";

const styles={
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image:{
        minWidth: 200
    },
    content:{
        padding:25,
        objectFit:'cover'
    }
};

function Scream({classes, scream : {body, createdAt, userImage, userHandle,
    screamId, likeCount, commentCount}, user:{authenticated, likes, credentials:{handle}}, likeScream, unlikeScream}) {
    dayjs.extend(relativeTime);
    const likedScream=()=>{
        return !!(likes && likes.find(like => like.screamId === screamId));
    };
    const likeScreamBtn=()=>{
        likeScream(screamId)
    };
    const unlikeScreamBtn=()=>{
        unlikeScream(screamId)
    };
    const likeButton= !authenticated
    ? <MyButton tip='Like'>
            <Link to='/login'>
                <FavoriteBorder color='primary'/>
            </Link>
        </MyButton>
        : (likedScream() ? <MyButton tip='Unlike' onClick={unlikeScreamBtn}>
            <Favorite color='primary'/>
        </MyButton> : <MyButton tip='Like' onClick={likeScreamBtn}>
            <FavoriteBorder color='primary'/>
        </MyButton>);
        const deleteCommentBtn = authenticated && userHandle === handle
            ? <DeleteScream screamId={screamId} />
            : null;

    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title='Profile image' className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography variant='h5'
                            component={Link} to={`/users/${userHandle}`}
                >{userHandle}</Typography>
                {deleteCommentBtn}
                <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant='body1'>{body}</Typography>
                {likeButton}
                <span>{likeCount} likes</span>
                <MyButton tip='comments'>
                    <Chat color='primary'/>
                </MyButton>
                <span>{commentCount} comments</span>
            </CardContent>
        </Card>
    );
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps =(state)=> ({
    user: state.user
});

export default connect(mapStateToProps,{likeScream, unlikeScream})(withStyles(styles)(Scream))
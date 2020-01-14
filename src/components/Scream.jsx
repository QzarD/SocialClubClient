import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Card, CardMedia, CardContent, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import {Chat} from "@material-ui/icons";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

function Scream({
                    openDialog, classes, scream: {
        body, createdAt, userImage, userHandle,
        screamId, likeCount, commentCount
    }, user: {authenticated, credentials: {handle}}}) {
    dayjs.extend(relativeTime);
    const deleteCommentBtn = authenticated && userHandle === handle
        ? <DeleteScream screamId={screamId}/>
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
                <LikeButton screamId={screamId}/>
                <span>{likeCount} likes</span>
                <MyButton tip='comments'>
                    <Chat color='primary'/>
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog}/>
            </CardContent>
        </Card>
    );
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {})(withStyles(styles)(Scream))
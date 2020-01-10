import React from 'react';
import MyButton from "../util/MyButton";
import {Link} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {likeScream, unlikeScream} from "../redux/dataReducer";

function LikeButton({screamId, user: {authenticated, likes, credentials: {handle}}, likeScream, unlikeScream}) {
    const likedScream = () => {
        return !!(likes && likes.find(like => like.screamId === screamId));
    };
    const likeScreamBtn = () => {
        likeScream(screamId)
    };
    const unlikeScreamBtn = () => {
        unlikeScream(screamId)
    };
    return (
        <>
            {!authenticated
                ? <Link to='/login'>
                    <MyButton tip='Like'>
                        <FavoriteBorder color='primary'/>
                    </MyButton>
                </Link>
                : (likedScream()
                    ? <MyButton tip='Unlike' onClick={unlikeScreamBtn}>
                        <Favorite color='primary'/>
                    </MyButton>
                    : <MyButton tip='Like' onClick={likeScreamBtn}>
                        <FavoriteBorder color='primary'/>
                    </MyButton>)
            }
        </>
    )
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {likeScream, unlikeScream})(LikeButton)
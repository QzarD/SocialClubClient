import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from '../images/noImg.png';
import Paper from "@material-ui/core/Paper";
import {CalendarToday, Link, LocationOn} from "@material-ui/icons";

const styles=theme=>({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    card:{
        display: 'flex',
        marginBottom: 20
    },
    cardContent:{
        width:'100%',
        flexDirection:'column',
        padding:25
    },
    cover:{
        minWidth:200,
        objectFit:'cover'
    },
    handle:{
        width:60,
        height:20,
        backgroundColor:theme.palette.primary.main,
        margin: '0 auto 7px auto'
    },
    date:{
        height: 14,
        width: 100,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    fullLine:{
        height: 15,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    halfLine:{
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    invisibleLine:{
        border: 'none',
        margin: '0 0 10px 0'
    },
    profileDetails:{
        textAlign:'center'
    }
});

function ProfileSkeleton({classes}) {

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={NoImg} alt="profile" className='profile-image'/>
                </div>
            </div>
            <hr className={classes.invisibleLine}/>
            <div className={classes.profileDetails}>
                <div className={classes.handle}/>
                <hr className={classes.invisibleLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <hr className={classes.invisibleLine}/>
                <LocationOn color='primary'/><span>Location</span>
                <hr className={classes.invisibleLine}/>
                <Link color='primary'/> https://website.com
                <hr className={classes.invisibleLine}/>
                <CalendarToday color='primary'/> Joined date
            </div>
        </Paper>
    );
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
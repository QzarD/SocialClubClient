import React from 'react';
import {connect} from "react-redux";
import {Paper, Tooltip, withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import MuiLink from'@material-ui/core/Link'
import Typography from "@material-ui/core/Typography";
import {CalendarToday, LocationOn} from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {logoutUser, uploadImage} from "../redux/userReducer";

const styles=(theme) => ({
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
    }
});

function Profile({
                     classes, user: {
        credentials: {
            handle, createdAt, imageUrl,
            bio, website, location
        }, loading, authenticated
    }, logoutUser, uploadImage
                 }) {
    const handleImageChange=(e)=>{
        const image=e.target.files[0];
        const formData=new FormData();
        formData.append('image', image, image.name);
        uploadImage(formData)
    };
    const handleEditPicture=()=>{
        const fileInput=document.getElementById('imageInput');
        fileInput.click()
    };
    let profileMarkup=loading
        ? <p>Loading...</p>
        : (authenticated
        ? <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className='profile-image'/>
                        <input type="file" id='imageInput' onChange={handleImageChange}
                               hidden='hidden'
                        />
                        <Tooltip title='Edit profile picture' placement='top'>
                            <IconButton onClick={handleEditPicture} className='button'>
                                <EditIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color='primary'
                        variant='h5'>
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio &&
                            <Typography varyant='body2'>{bio}</Typography>
                        }
                        <hr/>
                        {location &&
                            <>
                                <LocationOn color='primary'/><span>{location}</span>
                                <hr/>
                            </>
                        }
                        {website &&
                        <>
                            <LinkIcon color='primary'/>
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a>
                            <hr/>
                        </>
                        }
                        <CalendarToday color='primary'/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        : <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link}
                            to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='primary' component={Link}
                            to='/signup'>
                        Signup
                    </Button>
                </div>
            </Paper>);

    return profileMarkup
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {uploadImage, logoutUser})(withStyles(styles)(Profile))
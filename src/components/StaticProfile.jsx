import React from 'react';
import PropTypes from "prop-types";
import {Paper, withStyles} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link/Link";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {CalendarToday, LocationOn} from "@material-ui/icons";
import dayjs from "dayjs";
import LinkIcon from "@material-ui/icons/Link";

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
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
        }
    }
});

function StaticProfile({classes, user: {handle, createdAt, imageUrl,
            bio, website, location, email, userId}, loading}) {

    return (
        <>
            {loading
                ? <p>Loading...</p>
                : <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className='profile-image'/>
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
            }
        </>
    )
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StaticProfile)
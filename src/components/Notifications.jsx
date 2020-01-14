import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {markNotificationsRead} from "../redux/userReducer";
import {Menu, Tooltip} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import NotificationIcon from "@material-ui/icons/Notifications";
import dayjs from "dayjs";
import {Chat, Favorite} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

class Notifications extends Component{
    state={
        anchorEl: null
    };
    handleOpen = (e) => {
        this.setState({anchorEl: e.target})
    };
    handleClose = () => {
        this.setState({anchorEl: null})
    };
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications.filter(not => !not.read).map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds)
    };

    render() {
        const notifications=this.props.notifications;
        const anchorEl=this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(not => not.read === false).length > 0
                ? notificationsIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length}
                           color='secondary'>
                        <NotificationIcon/>
                    </Badge>
                ) : (notificationsIcon = <NotificationIcon/>
                )
        } else {
            notificationsIcon = <NotificationIcon/>
        }


        let notificationsMarkup = (
            (notifications && notifications.length > 0)
                ? notifications.map(not => {
                    const verb = not.type === 'like' ? 'like' : 'commented on';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like'
                        ? <Favorite color={iconColor} style={{marginRight: 10}}/>
                        : (<Chat color={iconColor} style={{marginRight: 10}}/>);
                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link} color='primary' variant='body1'
                                        to={`/users/${not.recipient}/scream/${not.screamId}`}>
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
                : <Menu onClick={this.handleClose}>
                    You have no notifications yet
                </Menu>);


        return (
            <>
                <Tooltip title='Notifications'>
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                          aria-haspopup='true' onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}
                      onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                </Menu>
            </>
        );
    }


}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
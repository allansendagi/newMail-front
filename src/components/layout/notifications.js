import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

//Mui stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//icons

import NotificationsIcon from '@material-ui/icons/Notifications';
import FavouriteIcon from '@material-ui/icons/Favourite';
import ChatIcon from '@material-ui/icons/Chat';

//redux stuff

import { connect } from 'react-redux';
import { markNotoficationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
	state = {
		anchorEl: null,

	}
	render(){
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		dayjs.extend(relativeTime);

		let notificationsIcon;

		if(notifications && notifications.length > 0) {
			notifications.filter(not => not.read===false).length > 0
			? notificationsIcon = (
				<Badge badgeContent={notifications.filter(not => not.read===false).length}
				color='secondary'>
				 <NotificationsIcon />
				</Badge>
				) : (
				notificationsIcon = <NotificationsIcon />
			)
				else {
				notificationsIcon = <NotificationsIcon />
				}
				let notificationsMarkup = 
				notifications && notifications.length > 0 ? (
					notifications.map(not => {
						const verb = not.type === 'like' ? 'liked' : 'commented on';
						const time = dayjs(not.createdAt).fromNow();
						const iconColor = not.read ? 'primary': 'secondary';
						const icon = not.type === 'like' ? (
							<FavouriteIcon color={iconColor} style={{marginRight:10}} />
							) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10}} />
						)
							return (
								<MenuItem key={not.createdAt} onClick={this.handleClose}>
								 {icon}
								  <Typography
								   component={Link}
								   color= 'default'
								   variant='body1'
								   to={`/users/${not.recipient}/mail/${not.mailId}`}
								   >
								   {not.sender} {verb} Your mail {time}
								  </Typography>
								</MenuItem>
							)
 					})
				) : (
				<MenuItem onClick={this.handleClose}>
				 You have no notifications yet!
				</MenuItem>
				)
				return (
					<Fragment>
						<ToolTip placemement='top' title='Notifications'>
						 <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
						  aria-haspopup='true'
						  onClick={this.handleOpen}
						  >
						  {notificationsIcon}
						  </IconButton>
						</ToolTip>
						 <Menu
						 anchorEl={anchorEl}
						 open={Boolean(anchorEl)}
						 onClose={this.handleClose}
						 onEntered={this.onMenuOpened}>
						 {notificationsMarkup}
						</Menu>
					</Fragment>
				)
		}
	}
}
Notifications.propTypes = {
	markNotoficationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
	notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotoficationsRead })(Notifications);







import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './editdetails';

//mui
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/useractions';
//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles =(theme) => ({
...theme.spread
});



class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	}

handleEditPicture = () => {
	const fileInput = document.getElementById('imageInput');
	 fileInput.click();
}
handleLogout = () => {
	this.props.logoutUser()
}
	render() {
		const { classes, user: {credentials:{ handle, createdAt, imageUrl, bio, website, location },
		loading,
		authenticated
	}
} = this.props;
let profileMarkup = !loading ? (authenticated ? (
	<Paper className={classes.paper}>
	  <div className={classes.profile}>
	   <div className='image-wrapper'>
	    <img src={imageUrl} alt="profile" className='profile-image'/>
	     <input 
	       type='file' 
	       id='imageInput'
	       hidden='hidden' 
	       onChange={this.handleImageChange} />
	      <Tooltip title='Edit profile picture' placement='top'>
	       <IconButton onClick={this.handleEditPicture} className='button'>
	         <EditIcon color='primary' />
	        </IconButton>
	       </Tooltip>
	   </div>
	   <hr />
	   <div className='profile-details'>
	   	<MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
	   	 @{handle}
	   	</MuiLink>
	   	<hr/>
	   	{bio && <Typography variant='body2'>{bio}</Typography>}
	   	<hr/>
	   	{location && (
	   		<Fragment>
	   		  <LocationOn color='primary' /> 
	   		  <span>{location}</span>
	   		  <hr/>
	   		</Fragment>
	   	)}
	   	{website && (
	   		<Fragment>
	   		 <LinkIcon color='primary' />
	   		 <a href={website} target='_blank' rel='noopener noreferrer'>
	   		  { ' '}{website}
	   		 </a>
	   		 <hr/>
	   		</Fragment>
	   	)}
	   	<CalendarToday color='primary'/>{''}
	   	<span> Joined {dayjs(createdAt).format('MM YYYY')} </span>
	   </div>
	   <Tooltip title='logout' placement='top'>
	     <IconButton onClick={this.handleLogout}>
	      <KeyboardReturn color='primary'/>
	     </IconButton>
	   </Tooltip>
	    <EditDetails/>
	  </div>
	</Paper>
	) : (
	<Paper className={classes.paper}>
	 <Typography variant='body2' align='center'>
	 No profile found. Please login again 
	 </Typography>
	 <div className={classes.buttons}>
	 	<Button variant='contained' color='primary' component={Link} to='/login'>
	 	login
	 	</Button>
	 	<Button variant='contained' color='secondary' component={Link} to='/signup'>
	 	signup
	 	</Button>
	 </div>
	</Paper>
	)) : (<p>loading...</p>)
		return profileMarkup;	
	}
}
const mapActionsToProps = { logoutUser, uploadImage };

const mapStateToProps = (state) => ({
	user: state.user
});
Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
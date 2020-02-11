import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './likebutton';
import Comments from './comments';
import CommentForm from './commentform';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI STUFF
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { getMail, clearErrors } from '../../redux/actions/dataactions';

const styles = (theme)=> ({
	...theme.spread1	
})

class MailDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: ''
	};
	componentDidMount(){
		if(this.props.openDialog){
			this.handleOpen();
		}
	}
	handleOpen = ()=> {
		let oldPath = window.location.pathname;

		const { userHandle, mailId } = this.props;
		const newPath = `/users/${userHandle}/mail/${mailId}`;

		if(oldPath===newPath) oldPath = `/users/${userHandle}`;

		window.history.pushState(null, null, newPath)

		this.setState({open:true, oldPath, newPath})
		this.props.getMail(this.props.mailId)
	}

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath)
		this.setState({ open: false})
		this.props.clearErrors()

	}

	render() {

		const {
			classes, 
			mail: { 
			  mailId, 
			  body, 
			  createdAt, 
			  likeCount, 
			  commentCount, 
			  userImage, 
	     	  userHandle,
	     	  comments
		},
		UI: {loading}
	 } = this.props;

	 const dialogMarkup = loading ? (
	 	<div className={classes.spinnerDiv}>
	 	<CircularProgress size={200} thickness={2}/>
	 	</div>
	 	) : (
	 	<Grid container spacing={16}>
	 	 <Grid item sm={5}>
	 	  <img src={userImage} alt='profile' className={classes.profileImage} />
	 	 </Grid>
	 	 <Grid item sm={5}>
	 	  <Typography
	 	    component={Link}
	 	    color='primary'
	 	    variant='h5'
	 	    to={`/users/${userHandle}`}
	 	     >
	 	 	@{userHandle}
	 	 	</Typography>
	 	 	<hr className={classes.invisibleSeparator} />
	 	 	<Typography variant='body2' color='textSecondary'>
	 	 	 {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
	 	 	</Typography>
	 	 	<hr className={classes.invisibleSeparator}/>
	 	 	<Typography variant='body1'>
	 	 	 {body}
	 	 	</Typography>
	 	 	<LikeButton mailId={mailId} />
	 	 	<span> {likeCount} likes </span>
	 	 	<MyButton tip='comments'>
			     <ChatIcon color='primary' />
			  </MyButton>
			   <span>{commentCount}comments</span>
	 	 </Grid>
	 	   <hr className={classes.visibleSeparator}/>
	 	   <CommentForm mailId={mailId} />
	 	  <Comments comments={comments} />
	 	</Grid>
	 	)
	 return (
		<Fragment>
			<MyButton onClick={this.handleOpen} tip='Expand mail' tipClassName={classes.expandButton}>
			 <UnfoldMore color='primary' />
			</MyButton>
			<Dialog
		    	open={this.state.open}
		        onClose={this.handleClose} 
		        fullWidth 
		        maxWidth='sm'
		        >
			  	<MyButton 
			  	tip='close' 
			  	onClick={this.handleClose} 
			  	tipClassName={classes.closeButton}
			  	>
			  	<CloseIcon />
			  	</MyButton>
			 <DialogContent className={classes.DialogContent}>
			  {dialogMarkup}
			 </DialogContent>
			</Dialog>
		</Fragment>
	)
	}
}
MailDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getMail: PropTypes.func.isRequired,
	mailId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	mail: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToprops = state => ({
	mail:state.data.mail,
	UI: state.UI
})

const mapActionToProps = {
	getMail,
	clearErrors
}
export default connect(mapStateToprops,mapActionToProps)(withStyles(styles)(MailDialog));











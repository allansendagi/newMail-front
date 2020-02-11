import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteMail from './deletemail';
import MailDialog from './mailDialog';
import LikeButton from './likebutton';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//icons
import ChatIcon from '@material-ui/icons/Chat';

const styles ={
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,

	},
	image:{
		minWidth:200,
	},
	content:{
		padding: 25,
		objectFit: 'cover'
	}
}

class Mail extends Component {
	
	render() {
		dayjs.extend(relativeTime);
	const {classes, mail: {
		body,
        createdAt,
        userImage,
        userHandle,
        mailId,
        likeCount,
        commentCount
    },
    
    user: {
    	authenticated,
    	credentials: { handle }
    }
     } = this.props;
     
     const deleteButton = authenticated && userHandle === handle ? (
     	  <DeleteMail mailId={mailId} />
     	)
     		: null

		return(
			<Card className={classes.card}>
			<CardMedia
	          image={userImage}
	          title="Profile image"
	          className={classes.image}
	          />
			    <CardContent className={classes.content}>
			    <Typography 
			     variant="h5" 
			     component={Link} 
			     to={`/users/${userHandle}`}
			     color='primary'
			     >
			     {userHandle}
			     </Typography>
			     {deleteButton}
			   <Typography 
			   variant="body2" color="textSecondary">
			   {dayjs(createdAt).fromNow()}
			   </Typography>
			   <Typography variant="body1">{body}</Typography>
			   <LikeButton mailId={mailId} />
			    <span>{likeCount}likes</span>
			    <MyButton tip='comments'>
			     <ChatIcon color='primary' />
			    </MyButton>
			    <span>{commentCount} comments</span>
			    <MailDialog mailId={mailId} userHandle={userHandle} openDialog={this.props.openDialog}/>
			  </CardContent>  
			</Card>
		)
	}
}
Mail.propTypes = {
    user: PropTypes.object.isRequired,
    mail: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool

}
const mapStateToProps = state => ({
	user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Mail));



import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { likeMail, unlikeMail } from '../redux/actions/dataactions';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteMail from './deletemail';
import MailDialog from './mailDialog';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


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
	likedMail = () => {
		if(this.props.user.likes && this.props.user.likes.find(like => like.mailId === this.props.mail.mailId))
			return true
		else return false
	}
likeMail = () => {
	this.props.likeMail(this.props.mail.mailId)
}
unlikeMail = () => {
	this.props.unlikeMail(this.props.mail.mailId)
}
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
     const likeButton = !authenticated ? (
     	<MyButton tip='like'>
     	 <Link to='/login'>
     	   <FavoriteBorder color='primary'/>
     	 </Link>
     	</MyButton>
     ) : (
     	this.likedMail() ? (
     		<MyButton tip='undo like' onClick={this.unlikeMail} >
     		 <FavoriteIcon color='primary' />
     		</MyButton>
     	) : (
     	<MyButton tip='like' onClick={this.likeMail} >
     		 <FavoriteBorder color='primary' />
     	</MyButton>
      )
     )
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
			    {likeButton}
			    <span>{likeCount}likes</span>
			    <MyButton tip='comments'>
			     <ChatIcon color='primary' />
			    </MyButton>
			    <span>{commentCount} comments</span>
			    <MailDialog mailId={mailId} userHandle={userHandle} />
			  </CardContent>  
			</Card>
		)
	}
}
Mail.propTypes = {
	likeMail: PropTypes.func.isRequired,
    unlikeMail: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    mail: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
	user: state.user
})
const mapActionsToProps = ({
	likeMail,
	unlikeMail
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Mail));



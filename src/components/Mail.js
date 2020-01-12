import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
//
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles ={
	card: {
		display: 'flex'
	}
}

class Mail extends Component {
	render() {
		const { classes, mail : { body, createdAt, userImage, userHandle, mailId, likeCount, commentCount } } = this.props;
		return(
			<Card>
			  <CardMedia
			  image= {userImage}
			  title="profile image"/>
			  <CardContent>
			   <Typography variant="h5">{userHandle}</Typography>
			   <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
			   <Typography variant="body1">{body}</Typography>
			  </CardContent>

			  
			</Card>
		)
	}
}

export default withStyles(styles)(Mail);
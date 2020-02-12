import React, {Fragment} from 'react';
import NoImg from '../images/no-image.png';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
	Card: {
		display: 'flex',
		marginBottom: 20,
	},
	CardContent: {
		width: '100%',
		flexDirection: 'column',
		padding: 25
	},
	cover: {
		minWidth: 200,
		objectFit: 'cover'	
	},
	handle: {
		width: 60,
		height:18,
		backgroundColor:theme.palette.primary.main,
		marginBottom: 7
	},
	data: {
		height: 14,
		width: 100,
		backgroundColor: 'rgba(0,0,0.3)',
		marginBottom: 10
	},
	fullLine: {
		height: 15,
		width: '90%',
	    backgroundColor: 'rgba(0,0,0.6)',
		marginBottom: 10
	},
	halfLine: {
		height: 15,
		width: '50%',
		backgroundColor: 'rgba(0,0,0.6)',
		marginBottom: 10
	}
})

const MailSkeleleton =(props) => {
const {classes } = props;
const content = Array.from({length: 5 }).map((item, index)=> (
	 <Card className={classes.card} key={index}>
	  <CardMedia className={classes.cover} image={NoImg} />
	  <CardContent className={classes.CardContent}>
	   <div className={classes.handle} />
	   <div className={classes.data} />
	   <div className={classes.fullLine} />
	   <div className={classes.fullLine} />
	   <div className={classes.halfLine} />
	  </CardContent>
	 </Card>
	))

return <Fragment>{content}</Fragment>
}

MailSkeleleton.propTypes ={
	classes:PropTypes.object.isRequired
}

export default withStyles(styles)(MailSkeleleton);
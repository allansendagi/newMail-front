import React, {Component, Fragment} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI stuff
import Button from '@material-ui/core/Button';
import  Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux';
import { deleteMail } from '../redux/actions/dataactions';

const styles = {

}

export class DeleteMail extends Component {
	 state={
	 	open:false
	 }
	 handleOpen = ()=> {
	 	this.setState({ open: true})
	 }
	 handleClose = ()=> {
	 	this.setState({ open: false})
	 }
	 deleteMail = ()=> {
	 	this.props.deleteMail(this.props.mailId)
	 	this.setState({ open: false})
	 }
	render() {
		const { classes } = this.props;

		return (
			<Fragment>
			  <MyButton tip='Delete Mail'
			   onClick={this.handleOpen}
			   btnClassName={classes.deleteButton}>
			    <DeleteOutline color='secondary' />
			   </MyButton>
			   <Dialog 
			     open={this.state.open}
			     onClose={this.handleClose}
			     fullWidth
			     maxWidth='sm'>
			     <DialogTitle>
			      Are you sure you want to delete this mail? This is action is not reversible!!
			     </DialogTitle>
			     <DialogActions>
			     </DialogActions>
			     	<Button onClick={this.handleClose} color='primary'>
			     	 Cancel
			     	</Button>
			     	<Button onClick={this.deleteMail} color='secondary'>
			     	 Delete
			     	</Button>
			     </Dialog>
			</Fragment>
		)
	}
}
DeleteMail.propTypes = {
	deleteMail: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	mailId:PropTypes.string.isRequired
}

export default connect(null, {DeleteMail})(withStyles(styles),(deleteMail));






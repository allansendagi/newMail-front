import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//reduc
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/useractions';
//mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//Icons
import EditIcon from '@material-ui/core/iconsEdit';

const styles = {theme} => ({
	...theme
})
class EditDetails extends Component {
	state={
		bio: '',
		website: '',
		location: '',
		open: false
	}
	handleOpen = () => {
		this.setState({ open: true })
		mapUserDetailsToState(this.props.credentials)
	}
	handleClose = () => {
		this.setState({ open: false})
	}
	componentDidMount() {
		const {credentials} = this.props; 
		mapUserDetailsToState(credentials);
	}
	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio: credentials.bio ? credentials.bio : '',
			website: credentials.bio ? credentials.website : '',
			location credentials.bio ? credentials.location : ''
		})
	}
		handleChange = (event)=> {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = () => {
		const userDetails = {
			
		}
	}
	render() {
		return (
			<Fragment>
				<Tooltip title='Edit details' placement='top'>
				 <IconButton onClick={handleOpen} className={classes.button}>
				   <EditIcon color='primary' />
				 </IconButton>
				</Tooltip>
				<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				fullWidth
				maxWidth='sm'>
				<DialogTitle>Edit your Details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
						name='bio'
						type='text'
						label='bio'
						multiline
						rows='3'
						placeholder='Your personal/professional website'
						className={classes.textField}
						value= {this.state.website}
						onChange={this.handleChange}
						fullWidth />
						<TextField
						name='location'
						type='text'
						label='location'
						placeholder='Where you live'
						className={classes.textField}
						value= {this.state.location}
						onChange={this.handleChange}
						fullWidth />
						<TextField
						name='bio'
						type='text'
						label=bio
						placeholder='A short Bio about yourself'
						className={classes.textField}
						value= {this.state.bio}
						onChange={this.handleChange}
						fullWidth />
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color='primary'>
					 cancel
					</Button>
					<Button onClick={this.handleSubmit} color='primary'>
					 save
					</Button>
				</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}
EditDetails.propTypes = {
	editUserDetails:PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
	credentials: state.user.credentials
})
export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));

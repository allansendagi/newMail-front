import React, {Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Mail from '../components/mail/Mail';
import StaticProfile from '../components/profile/staticprofile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataactions';

class User extends Component {
	state = {
		profile: null
	}

	componentDidMount(){
		const handle = this.props.match.params.handle;
		this.props.getUserData(handle);
		axios.get(`/user/${handle}`)
			  .then(res => {
			  	this.setState({
			  		profile: res.data.user
			  	})
			  })
			  .catch(err => console.log(err))
	}
	render() {
		const { mails, loading } = this.props.data;
		const mailsMarkup = loading ? (
			<p>Loading data ...</p>
			) : mails === null ? (
			 <p> No mails from this user</p>
			) : (
			mails.map(mail => <Mail key={mail.mailId} mail={mail} />)
			)


		return(
		 <Grid container spacing={10}>
		   <Grid item sm={8} xs={12}>
		   		{mailsMarkup}
		   </Grid>
		   <Grid item sm={4} xs={12}>
		   {this.state.profile ===null ? (
		   	<p>Loading profile...</p>
		   	) : (<StaticProfile profile={this.state.profile}/>)}
		   </Grid>
		 </Grid>
		)
	}
}
User.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	data: state.data
})

export default connect(
	mapStateToProps,
	{getUserData}
	)(User);





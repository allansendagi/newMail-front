import React, {Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Mail from '../components/mail/Mail';
import StaticProfile from '../components/profile/staticprofile';
import Grid from '@material-ui/core/Grid';

import MailSkeleton from '../util/mailskeleton';
import ProfileSkeleton from '../util/profileskeleton';


import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataactions';

class User extends Component {
	state = {
		profile: null,
		mailIdParam:null
	}

	componentDidMount(){
		const handle = this.props.match.params.handle;
		const mailId = this.props.match.params.mailId;

		if (mailId) {
			this.setState({ mailIdParam: mailId });
		}
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
		const { mailIdParam } = this.state;

		const mailsMarkup = loading ? (
			<MailSkeleton />
			) : mails === null ? (
			 <p> No mails from this user</p>
			) : !mailIdParam ? (
			mails.map(mail => <Mail key={mail.mailId} mail={mail} />)
			) : (
			   mails.map(mail => {
			   	if (mail.mailId !== mailIdParam) 
			   		return <Mail key={mail.mailId} mail={mail} />
			   		else return <Mail key={mail.mailId} mail={mail} openDialog /> 
			   })
			)


		return(
		 <Grid container spacing={10}>
		   <Grid item sm={8} xs={12}>
		   		{mailsMarkup}
		   </Grid>
		   <Grid item sm={4} xs={12}>
		   {this.state.profile ===null ? (
		   	<ProfileSkeleton />
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





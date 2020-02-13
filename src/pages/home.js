import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Mail from '../components/mail/Mail';
import Profile from '../components/profile/profile';
import MailSkeleton from '../util/mailskeleton';

import { connect } from 'react-redux';
import { getMails } from '../redux/actions/dataactions';



class home extends Component {
	componentDidMount(){
		this.props.getMails()
		}

	render() {
		const { mails,loading } = this.props.data;
		let recentMailsMarkup = !loading? (
			mails.map((mail) => <Mail key={mail.mailId} mail={mail} />)
			) : (
			<MailSkeleton />
		)
		
		return (
		 <Grid container spacing={10}>
		   <Grid item sm={8} xs={12}>
		   		{recentMailsMarkup}
		   </Grid>
		   <Grid item sm={4} xs={12}>
		    <Profile />
		   </Grid>
		 </Grid>
		
		);
	}
}
home.propTypes = {
getMails: PropTypes.func.isRequired,
data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	data: state.data
})

export default connect(mapStateToProps, { getMails })(home);
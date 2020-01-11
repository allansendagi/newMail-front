import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
class home extends Component {
	state ={
		mails: null
	}
	componentDidMount(){
		axios.get('/mails')
		  .then(response => {
		  	console.log(response.data)
		  	this.setState({
		  		mails: response.data
		  	})
		  })
		  .catch(err => console.log(err));
	}
	render() {
		let recentMailsMarkup = this.state.mails ? (
			this.state.mails.map(mail => <p>{mail.body}</p>)
			): <p>Loading...</p>
		return (
		 <Grid container spacing={10}>
		   <Grid item sm={8} xs={12}>
		   		{recentMailsMarkup}

		   </Grid>
		   <Grid item sm={4} xs={12}>
		    <p>profile</p>
		   </Grid>
		 </Grid>
		
		)
	}
}

export default home;
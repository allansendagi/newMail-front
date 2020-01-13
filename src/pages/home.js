import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Mail from '../components/Mail';


class home extends Component {
	state = {
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
		.catch(err => console.log(err))
		
	  
	}
	render() {

		let recentMailsMarkup = this.state.mails?(
			this.state.mails.map((mail) => <Mail mail={mail} />)
			):<p>Loading...</p>
		
		return (
		 <Grid container spacing={10}>
		   <Grid item sm={8} xs={12}>
		   		{recentMailsMarkup}
		   </Grid>
		   <Grid item sm={4} xs={12}>
		    <p>profile</p>
		   </Grid>
		 </Grid>
		
		);
	}
}

export default home;
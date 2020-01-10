import React, {Component} from 'react';

//MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';


class Navbar extends Component {
	render() {
		return(
		<AppBar>
		 <ToolBar>
		 	<Button color='inherit' >Login</Button>
		    <Button color='inherit' >Home</Button>
		    <Button color='inherit' >SignUp</Button>
		 </ToolBar>
		</AppBar>		
		)
	}
}

export default Navbar;
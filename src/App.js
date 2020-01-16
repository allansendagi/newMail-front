import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//components
import Navbar from './components/navbar';

const theme = createMuiTheme({
 palette: {
    primary: {
      light: '#757ce8',
      main: '#d500f9',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    }
  },
  spreadIt: {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '10px auto 20px auto'
  },
  pageTitle: {
    margin:'10px auto 20px auto'
  },
  textField: {
    margin: '10px auto 20px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem'
  },
  progress: 'absolute'
 }
});

class App extends Component {
	render() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
     <Router>
      <Navbar/>
      <div className='container'>
       <Switch>
        <Route exact path='/' component={home} />
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup} />
       </Switch>
       </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
 }
}

export default App;

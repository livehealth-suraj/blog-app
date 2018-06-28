import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Login',
      username: '',
      password: '',
      isAuthenticated: false,
      snackbar: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/blog');
    }
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={() => this.handleClick()}
            />
            <div>
              Not registered yet ? <Link to="/register">Register</Link>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  handleClick() {
    let apiBaseUrl = 'http://localhost:8000/api/';
    let payload = {
      username: this.state.username,
      password: this.state.password
    };

    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.post(apiBaseUrl + 'auth/', payload).then((response) => {
      if (response.status === 200) {
        this.setState({ isAuthenticated: true });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('me', response.data.user.id);
        this.props.history.push('/blog');
      }
    }).catch((error) => {
      let json = error.response.data;
      for (let key in json) {
        toast.error(json[key][0], {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 85
        });
      }
    });
  }
}

const style = {
  margin: 15,
};
export default Login;

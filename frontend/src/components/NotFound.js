import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Login',
      username: '',
      password: '',
      isAuthenticated: false
    };
  }

  render() {
    return (
      <div className="alert alert-danger">
        <strong>Error!</strong> Page not found.
      </div>
    );
  }
}

export default NotFound;

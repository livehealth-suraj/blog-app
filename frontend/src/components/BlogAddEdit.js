import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

class BlogAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      id: 0,
      blog: {},
      title: '',
      description: '',
      // add = true, edit = false
      isEditOrAdd: true,
      isAdd: ''
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id > 0) {
      let baseApiUrl = 'http://localhost:8000/api/';
      axios.get(baseApiUrl + 'blogs/' + id + '/').then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description
        });
      });
      this.setState({
        header: 'Edit Blog',
        isEditOrAdd: false,
        id: id
      });
    } else {
      this.setState({
        header: 'Add Blog',
        isEditOrAdd: true
      });
    }
  }

  saveBlog() {
    let baseApiUrl = 'http://localhost:8000/api/';
    let payload = {
      title: this.state.title,
      description: this.state.description,
      user: localStorage.getItem('me')
    };

    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';
    // Add blog
    if (this.state.isEditOrAdd) {
      axios.post(baseApiUrl + 'blogs/', payload).then(response => {
        this.props.history.push('/blog');
        alert('Blog saved successfully');
      });
    } else {
      //Edit blog
      let blogId = this.state.id;
      axios.put(baseApiUrl + 'blogs/' + blogId + '/', payload).then(response => {
        this.props.history.push('/blog');
        alert('Blog updated successfully');
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title={this.state.header} />
          <TextField
            floatingLabelText="Title"
            value={this.state.title}
            onChange={(event, newValue) => this.setState({ title: newValue })}
          />
          <br />
          <TextField
            floatingLabelText="Description"
            multiline={'true'}
            rows={4}
            margin="normal"
            value={this.state.description}
            onChange={(event, newValue) =>
              this.setState({ description: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Save"
            primary={true}
            style={style}
            onClick={() => this.saveBlog()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const style = {
  margin: 15
};
export default BlogAddEdit;

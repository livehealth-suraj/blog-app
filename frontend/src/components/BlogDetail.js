import React, { Component } from 'react';
import axios from 'axios/index';
import './BlogDetail.css';

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Blog Detail',
      blog: {}
    };
  }

  // componentDidMount() {
  //   let id = this.props.match.params.id;
  //   let baseApiUrl = 'http://localhost:8000/api/';
  //   axios.get(baseApiUrl + 'blogs/' + id + '/').then(response => {
  //     this.setState({ blog: response.data });
  //   });
  // }

  render() {
    return (
      <div>
        <h3>{this.state.blog.title}</h3>
        <hr />
        <p>{this.state.blog.description}</p>
        <p className="blogDescription">
          Publish date : {this.state.blog.publish_date}
        </p>
        <p>Published by : {this.state.blog.user}</p>
      </div>
    );
  }
}

export default BlogDetail;

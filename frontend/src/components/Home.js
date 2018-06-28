import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      header: 'Home',
      blogs: []
    }
  }

  componentDidMount() {
    let self = this;
    let baseApiUrl = "http://localhost:8000/api/";
    axios.get(baseApiUrl + "blogs/").then(function (response) {
      self.setState({blogs: response.data});
    });
  }

  render() {
    return (
      this.state.blogs.map(function (blog, index) {
        return <div>
          <div className="row mb-2" key={index}>
            <div className="col-md-6">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <h3 className="mb-0">{blog.title}</h3>
                  <p className="card-text mb-auto">{blog.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      })
    );
  }
}

export default Home;
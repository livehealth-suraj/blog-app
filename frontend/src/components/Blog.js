import React, { Component } from 'react';
import axios from "axios/index";
import { Link } from 'react-router-dom';
import './Blog.css';

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      header: 'Blog',
      blogs: [],
    };
  }

  getAllBlogs() {
    let baseApiUrl = "http://localhost:8000/api/";
    axios.get(baseApiUrl + "blogs/").then((response) => {
      this.setState({blogs: response.data});
    });
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  renderAddBlogBtn() {
    return <div>
      <button className="btn btn-primary pull-right" onClick={() => this.gotoAddBlog()}>Add blog</button>
    </div>;
  };

  remove(array, element) {
    return array.filter(e => e !== element);
  };

  countBlog = () => {
    return this.state.blogs.length;
  };

  editBlog = (id) => {
    this.props.history.push('/blog/edit/' + id);
  };

  deleteBlog = (id) => {

    let baseApiUrl = "http://localhost:8000/api/";

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.delete(baseApiUrl + "blogs/" + id + "/").then((response) => {

      const blogIndex = this.state.blogs.map(function (b) {
        return b.id
      }).indexOf(id);

      if (blogIndex >= 0) {
        let blogs = this.state.blogs.splice(blogIndex, 1);
        let remBlogs = this.remove(this.state.blogs, blogs);
        this.setState({blogs: remBlogs});
      }

      alert('Blog deleted');
    });
  };

  gotoAddBlog = () => {
    this.props.history.push('/blog/add');
  };

  render() {

    let blogCount = this.countBlog();

    return (

      <div>
        {this.renderAddBlogBtn()}
        <p>{blogCount !== 0 ? `Blog count => ${blogCount}` : "No blogs found"}</p>
        {

          this.state.blogs.map((blog, index) => {
            return <div className="row mb-2" key={index}>
              <div className="col-md-6">
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                  <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="mb-0">
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                      {/*<i className="fa fa-eye" onClick={() => this.showBlog(blog)}></i>*/}
                      <i className="fa fa-edit" onClick={() => this.editBlog(blog.id)}></i>
                      <i className="fa fa-trash-o" onClick={() => this.deleteBlog(blog.id)}></i>
                    </h3>
                    <p className="card-text mb-auto blogDescription">{blog.description}</p>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>

    );
  }
}

export default Blog;
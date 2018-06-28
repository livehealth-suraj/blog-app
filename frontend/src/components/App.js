import React, { Component } from 'react';
import './App.css';
import { HashRouter, Redirect, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import Blog from './Blog';
import BlogDetail from './BlogDetail';
import BlogAddEdit from './BlogAddEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  renderNavLink() {
    if (!localStorage.getItem('token')) {
      return (
        <li className="nav-item">
          <Link to={'/'} className="nav-link">
            Login
          </Link>
        </li>
      );
    }
    return (
      <li className="nav-item">
        <Link to={'/blog'} className="nav-link pull-left">
          Blogs
        </Link>
      </li>
    );
  }

  renderLogout() {
    if (localStorage.getItem('token')) {
      return (
        <li className="nav-item">
          <Link
            onClick={() => {
              localStorage.clear();
              this.setState({ isAuthenticated: false });
            }} to="/" className="nav-link">Logout</Link></li>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  BlogApp
                </a>
              </div>
              <ul className="navbar-nav ml-0">
                {this.renderNavLink()}
                {this.renderLogout()}
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute
                exact={true}
                isAuthenticated={localStorage.getItem('token') !== null}
                path="/blog"
                component={Blog}
              />
              <PrivateRoute
                isAuthenticated={localStorage.getItem('token')}
                path="/blog/add"
                component={BlogAddEdit}
              />
              <PrivateRoute
                isAuthenticated={localStorage.getItem('token')}
                path="/blog/edit/:id"
                component={BlogAddEdit}
              />
              <PrivateRoute
                isAuthenticated={localStorage.getItem('token')}
                path="/blog/:id"
                component={BlogDetail}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

const PrivateRoute = ({ component, isAuthenticated, path, exact = false }) => {
  if (!isAuthenticated) {
    isAuthenticated = localStorage.getItem('token');
  }
  return isAuthenticated ?
    ( <Route path={path} exact={exact} component={component} /> ) : (<Redirect to="/" from={path} />);
};

export default App;

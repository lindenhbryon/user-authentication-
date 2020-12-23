import { Component } from 'react';
import axios from 'axios';
import FormError from '../Error/FormError';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        loginSuccess: false,
        errors: []
      };
      
    }
    LogInUser = (data, cb) => {
      axios
      .post('http://localhost:8080/api/login', data)
      .then((res) => cb(res))
      .catch(err => {
        console.error(err);
      });
    }
    loginCallback = (res) => {
      localStorage.setItem('authToken', res.data.token);
      this.setState({errors: [res.data.message], loginSuccess:res.data.success});
      
      console.log(this.state);
    }
    handleChange = (e) => {
      const target = e.target;
      const name = target.name;
      this.setState({
          [name]: target.value
      });
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.LogInUser({
        username: this.state.username,
        password: this.state.password
    }, this.loginCallback);
      
  }
    render() {
      return (
        <div className="center-container">
          <h2>Login</h2>
          {this.state.loginSuccess == true ? <Redirect direct to="/dashboard" /> : ''}
          <FormError errors={this.state.errors} userCreated={this.state.userCreated}/>
          <form id="login-form" onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username-label" className="form-label">Username</label>
              <input 
                type="text"
                className="form-control"
                name="username"
                id="username"
                aria-describedby="username"
                required
                onChange={this.handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password-field" className="form-label">Password</label>
              <input 
                type="password"
                className="form-control"
                name="password"
                id="password"
                required
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    }
  }

  export default Login;
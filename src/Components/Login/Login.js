import { Component } from 'react';
import { Link } from 'react-router-dom';

function LoginForm(){
  return <form id="login-form">
  <div className="mb-3">
    <label htmlFor="username-label" className="form-label">Username</label>
    <input type="text" className="form-control" name="username" id="username" aria-describedby="username" />
  </div>
  <div className="mb-3">
    <label htmlFor="password-field" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
}


class Login extends Component {
    render() {
      return (
        <div>
            <LoginForm/>
        </div>
      );
    }
  }

  export default Login;
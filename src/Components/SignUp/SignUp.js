import { Component } from 'react';
class SignUp extends Component {
    render(){
        return(
            <form id="login-form">
                <div className="mb-3">
                    <label for="username-label" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" id="username" aria-describedby="username" />
                </div>
                <div className="mb-3">
                    <label for="password-field" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label for="password-field" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="password_confirm" id="password-confirm" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default SignUp
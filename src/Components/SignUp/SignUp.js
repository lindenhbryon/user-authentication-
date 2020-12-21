import { Component } from 'react';
import axios from 'axios';
import FormError from '../Error/FormError';
import { Redirect } from 'react-router-dom';
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password_confirm: '',
            errors: [],
            userCreated: false,
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    callBackendApi = (data, cb) => {
        axios
      .post('http://localhost:8080/api/create-user', data)
      .then((res) => cb(res))
      .catch(err => {
        console.error(err);
      });
    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        }, () => {
            if(this.state.password === this.state.password_confirm){
                this.setState({errors: []});
            }
        });
    }
    checkPasswordsMatch(){
        return this.state.password === this.state.password_confirm ? true : false
    }
    createUserCallback = (res) => {
        this.setState({errors: [res.data.message], userCreated:res.data.success});
       if(res.data.success){
           document.querySelector('#login-form').reset();
       }
       setTimeout(() => {
            this.setState({redirect: true});
       }, 1500);
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.checkPasswordsMatch()){
            this.setState({errors: []}, () => {
                this.setState({errors: ['Passwords Do Not Match.']});
            })
            return false;
        }
        this.callBackendApi({
            username: this.state.username,
            password: this.state.password
        }, this.createUserCallback);
        
    }
    render(){
        return(
            <div className="center-container">
                 {this.state.redirect ? <Redirect to="/" /> : ''}
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <h2>Sign Up</h2>
                    <FormError errors={this.state.errors} userCreated={this.state.userCreated}/>
                    <div className="mb-3">
                        <label htmlFor="username-label" className="form-label">Username</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            aria-describedby="username"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-field" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            onChange={this.handleChange} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-field" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password_confirm"
                            id="password-confirm" 
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp
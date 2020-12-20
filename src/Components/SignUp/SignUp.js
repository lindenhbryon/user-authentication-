import { Component } from 'react';
import axios from 'axios';
import FormError from '../Error/FormError';
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password_confirm: '',
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        
    }
    callBackendApi = (data) => {
        axios
      .post('http://localhost:8080/api/create-user', data)
      .then(() => console.log('linden Created'))
      .catch(err => {
        console.error(err);
      });
    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    checkPasswordsMatch(){
        return this.state.password === this.state.password_confirm ? true : false
    }
    handleSubmit(e){
        e.preventDefault();
        
        //we should also check if username exists here
        if(!this.checkPasswordsMatch()){
            //show error on frontend
            this.setState({errors: []}, () => {
                this.setState({errors: [...this.state.errors, 'Passwords Do Not Match.']});
            })
            return false;
        }
        //send data to backend
        this.callBackendApi({
            username: this.state.username,
            password: this.state.password
        });
        
    }
    render(){
        return(
            <div>
            <FormError errors={this.state.errors}/>
            
            <form id="login-form" onSubmit={this.handleSubmit}>
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
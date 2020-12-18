import { Component } from 'react';
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password_confirm: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.callBackendApi().then((res) => {
            console.log("success", res);
        }).catch((err) => {
            console.log("er", err);
        });
    }
    callBackendApi = async () => {
        
        const response = await fetch('/api/home');
        const body = await response.json();
        if(response.status !== 200){
            throw Error(body.message)
        }
        return body;
    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
        console.log(this.state);
    }
    checkPasswordsMatch(){
        return this.state.password === this.state.password_confirm ? true : false
    }
    handleSubmit(e){
        e.preventDefault();
        //we should also check if username exists here
        if(!this.checkPasswordsMatch()){
            //show error on frontend
        }
        //send data to backend
        
    }
    render(){
        return(
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
        )
    }
}

export default SignUp
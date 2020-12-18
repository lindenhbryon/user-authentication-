import { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Navbar extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">User Authentication</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink exact activeClassName='is-active' to="/sign-up">Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact activeClassName='is-active' to="/">Login</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>  
        );
    }
}

export default Navbar
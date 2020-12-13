import '../../App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Error from '../Error/Error';
import SignUp from '../SignUp/SignUp';


function App() {
  return (
      <main>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/sign-up" component={SignUp} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route component={Error} />
          </Switch>
          <div>
            <Link to="/">Login</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
      </main>
  )
}

export default App;

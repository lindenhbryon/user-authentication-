import { Switch, Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import Error from '../Error/Error';
import SignUp from '../SignUp/SignUp';
import Dashboard from '../Dashboard/Dashboard';


function Routes(){
    return(
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/sign-up" component={SignUp} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route component={Error} />
        </Switch>
    )
}
export default Routes
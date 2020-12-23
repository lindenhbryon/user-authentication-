import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Error from '../Error/Error';
import SignUp from '../SignUp/SignUp';
import Dashboard from '../Dashboard/Dashboard';
import { PrivateRoute } from '../../helpers/privateRoute';

function Routes(){
    return(
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/sign-up" component={SignUp} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <Route component={Error} />
        </Switch>
    )
}
export default Routes
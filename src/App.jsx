import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import "./App.css";
import Dial from "./Dial";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dial" component={Dial} />
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

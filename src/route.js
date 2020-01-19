// react libraries
import * as React from 'react';

// third party packages
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import HomePage from './pages/Home';
import Header from './components/Navbar'

const Routes = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>
)

export default Routes;
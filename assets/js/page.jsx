import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import store from './store';

import SearchRecipes from './recipes/search';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <NavLink to="/recipes/search" exact activeClassName="active" className="nav-link">
              Search Recipes
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/users" exact activeClassName="active" className="nav-link">
              Users
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/recipes/search">
          <SearchRecipes/>
        </Route>

        <Route exact path="/users">
          <h1>Users</h1>
        </Route>
      </Switch>
    </Router>
  );
}

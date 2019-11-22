import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import store from './store';

import SearchRecipes from './recipes/search';

import TestPage from './test1';
import TestNewMp from './mealplans/new_test';
import TestNewDp from './dayplans/new_dayplan_test';

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
          <Nav.Item>
            <NavLink to="/test" exact activeClassName="active" className="nav-link">
              Test Get Recipe
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/testcreatemp" exact activeClassName="active" className="nav-link">
              Test Create Meal Plan
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/testcreatedp" exact activeClassName="active" className="nav-link">
              Test Create Day Plan
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

        <Route exact path="/test">
          <TestPage/>
        </Route>

        <Route exact path="/testcreatemp">
          <TestNewMp/>
        </Route>

        <Route exact path="/testcreatedp">
          <TestNewDp/>
        </Route>
      </Switch>
    </Router>
  );
}

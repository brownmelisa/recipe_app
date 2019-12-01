import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import {Navbar, Nav, Col} from 'react-bootstrap';
import {Provider, connect} from 'react-redux';

import Home from './tabs/home'
import Login from './tabs/login';
import store from './store';

import Signup from './signup';
//import Login from './login';

import SearchRecipes from './recipes/search';

import RecipePage from './recipes/recipe_page'
import MealPlanNew from './mealplans/mealplan_new'
import TestPage from './test1';
import TestNewMp from './mealplans/new_test';
import TestNewDp from './dayplans/new_dayplan_test';
import TestGetMp from './mealplans/show_mealplan_test';
import TestGetAllMps from './mealplans/show_mealplans_by_user_test';
import TestGetGc from './grocerylists/show';

import TestCarousel from './mealplans/recipes_carousel';
import MealPlansAll from './mealplans/mealplans_all_show';
import GroceryList from "./mealplans/grocery_list";

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
        <Col md="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>

            {/*<Nav.Item>*/}
            {/*  <NavLink to="/recipes/search" exact activeClassName="active" className="nav-link">*/}
            {/*    Search Recipes*/}
            {/*  </NavLink>*/}
            {/*</Nav.Item>*/}

            <Nav.Item>
              <NavLink to="/mp/new" exact activeClassName="active" className="nav-link">
                New Meal Plan
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to="/mp" exact activeClassName="active" className="nav-link">
                My Meal Plans
              </NavLink>
            </Nav.Item>

            {/*<Nav.Item>*/}
            {/*  <NavLink to="/test" exact activeClassName="active" className="nav-link">*/}
            {/*    Test*/}
            {/*  </NavLink>*/}
            {/*</Nav.Item>*/}



            {/*<Nav.Item>*/}
            {/*  <NavLink to="/testcreatemp" exact activeClassName="active" className="nav-link">*/}
            {/*    Test Create Meal Plan*/}
            {/*  </NavLink>*/}
            {/*</Nav.Item>*/}

            {/*<Nav.Item>*/}
            {/*  <NavLink to="/testcreatedp" exact activeClassName="active" className="nav-link">*/}
            {/*    Test Create Day Plan*/}
            {/*  </NavLink>*/}
            {/*</Nav.Item>*/}

            {/*<Nav.Item>
              <NavLink to="/testcarousel" exact className="nav-link">
                Test Carousel
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to="/testgetmp" exact activeClassName="active" className="nav-link">
                Test Get Meal Plan Details
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/testgetallmps" exact activeClassName="active" className="nav-link">
                Test Get MPs for user
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/testgetgc" exact activeClassName="active" className="nav-link">
                Test Get GC for meal plan
              </NavLink>
            </Nav.Item>*/}

          </Nav>
        </Col>
        <Col md="4">
          <Session/>
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/mp/new">
          <MealPlanNew/>
        </Route>

        {/*<Route exact path="/mp/new" render= { () =>
          (!store.getState().session) ?
          (<h3 style =
            {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
              Please login to create Meal Plans.
          </h3>) : (<MealPlanNew/>)
        }/>*/}



        <Route exact path="/mp">
          <MealPlansAll/>
        </Route>

        {/*<Route exact path="/recipes/search">*/}
        {/*  <SearchRecipes/>*/}
        {/*</Route>*/}

        <Route
          exact path='/recipepage'
          render={(props) => <RecipePage {...props} />}
        />
        <Route exact path="/login">
          <Login/>
        </Route>

        <Route exact path="/signup">
          <Signup/>
        </Route>
        {/*<Route exact path="/test">*/}
        {/*  <TestPage/>*/}
        {/*</Route>*/}

        {/*<Route exact path="/testcreatemp">*/}
        {/*  <TestNewMp/>*/}
        {/*</Route>*/}

        <Route exact path="/testcreatedp">
          <TestNewDp/>
        </Route>

        <Route exact path="/testcarousel">
          <TestCarousel/>
        </Route>

        <Route exact path="/testgetmp">
          <TestGetMp/>
        </Route>

        <Route exact path="/testgetallmps">
          <TestGetAllMps/>
        </Route>

        <Route exact path="/testgetgc">
          <TestGetGc/>
        </Route>

        <Route exact path="/grocery/:id"
               render={
                 (props) => <GroceryList id={props.match.params.id} />
        } />


      </Switch>
    </Router>
  );
}


let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });

  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className = "text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="/" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
      	<Nav.Item>
      	  <NavLink to="/signup" exact activeClassName="active" className="nav-link">
      	    Sign Up
      	  </NavLink>
      	</Nav.Item>
      </Nav>
    );
  }
});

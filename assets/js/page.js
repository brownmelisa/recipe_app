import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import PhotosList from './recipe/index';

import store from './store';

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
                    </Nav>
                </Col>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <PhotosList />
                </Route>
            </Switch>
        </Router>
    );
}

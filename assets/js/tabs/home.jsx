import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import RecipesList from '../recipe/index';
import SearchBar from './searchbar'
import store from '../store';
import { Row } from 'react-bootstrap';

function Content() {
    return (
        <div>
            <Row>
                <SearchBar />
            </Row>
            <Row>
                <RecipesList />
            </Row>
        </div>
    )
}

let Home = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
    if (session) {
        return (
            <div>
                <p>Here is the Home page</p>
                <Content />
            </div>
        );
    }
    else {
        return (
            <h1>Please click login link in the navigation bar</h1>
        );
    }
});

export default Home;

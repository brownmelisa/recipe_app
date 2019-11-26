import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import RecipesList from '../recipes/cards';
import SearchRecipes from '../recipes/search'
import store from '../store';
import { Row } from 'react-bootstrap';

function Content() {
    return (
        <div>
            <Row>
                <SearchRecipes />
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

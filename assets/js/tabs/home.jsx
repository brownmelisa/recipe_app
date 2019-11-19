import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import RecipesList from './recipe/index';

import store from './store';
import { Row } from 'react-bootstrap';

function Home() {
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


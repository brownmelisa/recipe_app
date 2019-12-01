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
        // {/*<h1>Please click login link in the navigation bar</h1>*/}
        return (

        <div>
          <h2 style =
            {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
              Welcome to the Recipe App.
          </h2>
          <h3 style =
            {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
              Please login to search recipes.
          </h3>
        </div>

        );
    }
});

export default Home;

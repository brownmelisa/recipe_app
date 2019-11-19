import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import RecipeCard from './card';

let RecipesList = connect(({ recipes }) => ({ recipes }))(recipesCards)

function recipesCards({ recipes }) {
    let cards = _.map([...recipes], ([_, recipe]) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
    });

    return (
        <div>
            <div className="row">
                {cards}
            </div>
        </div>
    )
}

export default RecipesList;
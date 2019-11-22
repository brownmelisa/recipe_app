import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import RecipeCard from './card';

let RecipesList = connect(({ recipes }) => ({ recipes: recipes.search_resp }))(recipesCards)

function recipesCards({ recipes }) {
    let cards = _.map(recipes, ((recipe, id) => {
        return <RecipeCard key={recipe.id} recipe={recipe} local_id={id} />;
    }));

    return (
        <div>
            <div className="row">
                {cards}
            </div>
        </div>
    )
}

export default RecipesList;
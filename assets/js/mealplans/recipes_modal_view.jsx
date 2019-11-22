import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';
import {Carousel} from 'react-bootstrap';

import RecipeCard from './card';

let RecipesList = connect(({ recipes }) => ({ recipes: recipes.search_resp }))(recipesCards)

function recipesCards({ recipes }) {
  console.log("recipes", recipes);
  let cards = _.map(recipes, ((recipe, id) => {
    return <RecipeCard key={recipe.id} recipe={recipe} local_id={id} />;
  }));

  return (
    <div>
      <div className="row">
        <Carousel>
        {cards}
        </Carousel>
      </div>
    </div>
  )
}

export default RecipesList;

import React from 'react';
import ReactDOM from 'react-dom';


import { connect } from 'react-redux';
import _ from 'lodash';




function recipePage({ match, location, recipes }) {
    console.log("recipe route param", match, location);
    let local_id = location.state.id;
    let recipe = recipes[local_id];
    console.log("redux", recipe)

    return (
        <div>
            <h2>Recipe Name: {recipe.title}</h2>
            <img src={recipe.image_url} />
            <p>Calories: {recipe.calories}</p>
            <p>Carbs: {recipe.carbs}</p>
            <p>Fats: {recipe.fats}</p>
            <p>Protein: {recipe.protein}</p>
        </div>
    )
}



let RecipePage = connect(({ recipes }) => ({ recipes: recipes.search_resp }))(recipePage)
export default RecipePage;
import React from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Alert, Card, Row, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getRecipe } from '../ajax';


import { deleteMealPlan, getAllMealPlans, getGroceryList } from '../ajax';
import RecipePage from '../recipes/recipe_page';
import GroceryList from "./grocery_list";

class MealDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        };
    }

    redirect(id) {
        console.log("redirect id", id);
        this.props.dispatch({
            type: 'CHANGE_GET_RECIPE_TEST',
            data: { recipeId: id },
        });
        getRecipe();
        this.setState({
            redirect: "/recipepage",
        });
    }

    render() {
        let meal = this.props.meal;

        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect,
                // local_id will not be used here
                state: { id: 0 }
            }} />;
        }
        if (meal) {
            return (
                <div>
                    <Button className="accRecipeLink" variant="link" onClick={() => this.redirect(meal.id)}>{meal.title}</Button>
                    <p className="p_meal_detail">Calories: {meal.calories}</p>
                    <p className="p_meal_detail">Carbs: {meal.carbs}</p>
                    <p className="p_meal_detail">Protein: {meal.protein}</p>
                    <p className="p_meal_detail">Fat: {meal.fats}</p>
                    <p className="p_meal_detail">Price Per Serving: ${meal.pricePerServing.toFixed(2)}</p>
                </div>
            )
        }
    }
}

export default connect(({ }) => ({}))(MealDescription)


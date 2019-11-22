import React, {useState} from 'react';
import {Redirect} from 'react-router';
import _ from 'lodash';

import {Collapse, Modal, Container, ButtonToolbar, Row, Col, Button, Table, Form, ListGroup} from 'react-bootstrap'
import SearchRecipes from '../recipes/search'
import MealsShow from './meals_show'
import GroceryList from './grocery_list';
import RecipesCarousel from './recipes_carousel'
import RecipesCarouselTest from './recipes_carousel_test';
import Home from '../tabs/home';

export default class MealplanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      // some dummy data in meals and ingredients
      recipes: [{
        "calories": 393.004,
        "carbs": "17.1274g",
        "fats": "14.8836g",
        "id": 573591,
        "image_url": "https://spoonacular.com/recipeImages/573591-312x231.jpg",
        "protein": "45.5059g",
        "recipe_id": 573591,
        "title": "Maple Glazed Salmon"
      },
        {
          "calories": 553.315,
          "carbs": "81.0196g",
          "fats": "6.70668g",
          "id": 591705,
          "image_url": "https://spoonacular.com/recipeImages/591705-312x231.jpg",
          "protein": "42.8016g",
          "recipe_id": 591705,
          "title": "Tuna & White Bean Salad"
        },
        {
          "calories": 284.076,
          "carbs": "35.2282g",
          "fats": "8.0963g",
          "id": 695118,
          "image_url": "https://spoonacular.com/recipeImages/695118-312x231.jpg",
          "protein": "19.114g",
          "recipe_id": 695118,
          "title": "Tuna & White Bean Salad"
        },
        {
          "calories": 404.668,
          "carbs": "12.3164g",
          "fats": "22.4964g",
          "id": 775925,
          "image_url": "https://spoonacular.com/recipeImages/775925-312x231.jpg",
          "protein": "38.5209g",
          "recipe_id": 775925,
          "title": "Baked Mustard-Crusted Salmon With Asparagus and Tarragon"
        }
      ],
      meals: [
        {id: 210306, meal: "breakfast", title: "Very simple Margherita pizza"},
        {id: 409234, meal: "lunch", title: "recipe 2"},
        {id: 232395, meal: "snack", title: "recipe 3"},
        {id: 239523, meal: "lunch", title: "recipe 4"},
        {id: 207504, meal: "dinner", title: "recipe 5"}
      ],
      ingredients: [
        {
          "id":4053,
          "aisle":"Oil, Vinegar, Salad Dressing",
          "name":"olive oil",
          "amount":1,
          "unit":"serving"
        },
        {
          "id":20081,
          "aisle":"Baking",
          "name":"plain flour",
          "amount":200,
          "unit":"g"
        },
        {
          "id":18375,
          "aisle":"Baking",
          "name":"yeast",
          "amount":7,
          "unit":"g"
        },
      ],
      show_modal: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  // handles submit meal plan button click
  handleSubmit(event) {
    alert('form was submitted: ' + event.target.value);
    event.preventDefault();
  }

  handleClose(ev) {
    this.setState({show_modal: false});
  }

  handleShow(ev) {
    this.setState({show_modal: true});
  }

  handleAddMeal(ev, name) {
    console.log("meal to add", ev.target);
    alert('meal added' + ev.target.value);
    console.log('recipe name', name);
  }

  render() {

    return (
      <div>
        <h1 id="mpHeader">
          Make a Meal Plan
        </h1>
        <Row>
          <Col sm={4} md={6}>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="mealPlanDate">
                <Form.Label column sm="2">Date</Form.Label>
                <Col sm="10">
                <Form.Control type="date"/>
                </Col>
              </Form.Group>

              <MealsShow meals={this.state.meals}/>
              <Button className="mpBtn" onClick={this.handleShow}>+ meal</Button>
              <Button id="savePlanBtn" type="submit">Save Plan</Button>
            </Form>


          </Col>

          <Col sm={4} md={6}>
            <GroceryList groceries={this.state.ingredients}/>
            <br />
          </Col>
        </Row>

        <Modal id="mpModal" show={this.state.show_modal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Meal Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <SearchRecipes />
              <RecipesCarouselTest/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

{/*<RecipesCarousel recipes={this.state.recipes} onAddMeal={this.handleAddMeal}/>*/}

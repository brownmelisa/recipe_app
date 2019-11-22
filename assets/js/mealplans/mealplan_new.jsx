import React, {useState} from 'react';
import {Redirect} from 'react-router';
import _ from 'lodash';

import {Collapse, Modal, Container, ButtonToolbar, Row, Col, Button, Table, Form, ListGroup} from 'react-bootstrap'
import SearchRecipes from '../recipes/search'
import MealsShow from './meals_show'
import GroceryList from "./grocery_list";
import Home from '../tabs/home';


export default class MealplanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      // some dummy data in meals and ingredients
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
            <Home />
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

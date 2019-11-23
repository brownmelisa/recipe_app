import React, {useState} from 'react';
import {Redirect} from 'react-router';
import _ from 'lodash';

import {Modal, Row, Col, Button, Table, Form, Alert} from 'react-bootstrap'
import SearchRecipes from '../recipes/search'
import RecipesCarousel from './recipes_carousel'
import {createNewDayPlan} from "../ajax";
import {connect} from "react-redux";

// Send events from component to redux store.
// Return "state" instead of "state.forms.test_create_new_day_plan"
// so that we can access the session data in props.
function state2props(state) {
  return state;
}

class DayPlanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      show_modal: false,
      show_alert: false,
      meal_type: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      snack: ""
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
    this.recipe_changed = this.recipe_changed.bind(this);
  }

  redirect(path) {
    this.setState({redirect: path});
  }


  // handles any form changes and update store
  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_DAY_PLAN_NAME',
      data: data,
    });
  }

  // this function is necessary to get the recipe title
  // the store only contains the recipe id
  recipe_changed(data, recipe_title, meal_type) {
    console.log("meal type in day plan is", meal_type);
    this.setState({[meal_type]: recipe_title});
    this.changed(data);
  }

  // handles submit meal plan button click
  handleSubmit(event) {
    alert('submit form clicked with value: ' + event.target.value);
    event.preventDefault();
  }

  // handles closing the modal
  handleClose(ev) {
    this.setState({show_modal: false});
  }

  // handles opening the modal, also checks that users have created
  // a meal plan before they start adding meals
  handleShow(mealType) {
    if (!this.props.plan_name) {
      this.setState({show_alert: true});
      return;
    }
    console.log("handle shoe meal type is", mealType);
    this.setState({show_modal: true});
    this.setState({meal_type: mealType});
  }

  handleAddMeal(ev, name) {
    console.log("meal to add", ev.target);
    alert('meal added' + ev.target.value);
    console.log('recipe name', name);
  }

  render() {
    let user_id = this.props.session.user_id;
    let plan_name = this.props.plan_name;

    console.log("printing out props in day", this.props);
    return (
      <div>
        <h1 id="mpHeader">
          Daily Meal Plan
        </h1>
        <Row>
          <Col sm={4} md={6}>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="mealPlanDate">
                <Form.Label column sm="2">Date</Form.Label>
                <Col sm="10">
                  <Form.Control
                    required
                    type="date"
                    onChange={(ev) => this.changed(
                      {date: ev.target.value, userId: user_id, mealPlanName: plan_name}
                    )}
                  />
                </Col>
              </Form.Group>

              {this.state.show_alert == true &&
               <Alert variant="danger">create a plan name first</Alert>
              }

              <Table striped hover id="breakfastTable">
                <thead>
                <tr>
                  <th width="80%">BREAKFAST</th>
                  <th width="20%">
                    <Button className="mpBtn"
                            onClick={() => this.handleShow("breakfast")}>
                      +
                    </Button>
                  </th>
                </tr>
                </thead>
                <tbody>{this.state.breakfast && <tr><td>{this.state.breakfast}</td></tr>}</tbody>
              </Table>

              <Table striped hover id="lunchTable">
                <thead>
                <tr>
                  <th width="80">LUNCH</th>
                  <th width="20%">
                    <Button className="mpBtn"
                            onClick={() => this.handleShow("lunch")}>
                      +
                    </Button>
                  </th>
                </tr>
                </thead>
                <tbody>{this.state.lunch && <tr><td>{this.state.lunch}</td></tr>}</tbody>
              </Table>

              <Table striped hover id="dinnerTable">
                <thead>
                <tr>
                  <th width="80">DINNER</th>
                  <th width="20%">
                    <Button className="mpBtn"
                            onClick={() => this.handleShow("dinner")}>
                      +
                    </Button>
                  </th>
                </tr>
                </thead>
                <tbody>{this.state.dinner && <tr><td>{this.state.dinner}</td></tr>}</tbody>
              </Table>

              <Table striped hover id="dinnerTable">
                <thead>
                <tr>
                  <th width="80">SNACK</th>
                  <th width="20%">
                    <Button className="mpBtn"
                            onClick={() => this.handleShow("snack")}>
                      +
                    </Button>
                  </th>
                </tr>
                </thead>
                <tbody>{this.state.snack && <tr><td>{this.state.snack}</td></tr>}</tbody>
              </Table>

              <Button id="savePlanBtn"
                      type="submit"
                      onClick={() => createNewDayPlan(this)}>
                Save Daily Plan
              </Button>
            </Form>


          </Col>

          <Col sm={4} md={6}>
            maybe add a nutrient chart here
            <br />
          </Col>
        </Row>

        <Modal id="mpModal"
               show={this.state.show_modal}
               onHide={this.handleClose}>
          <Modal.Header id="mpModalHeader" closeButton>
            <Modal.Title>Add to Meal Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body id="mpModalBody">
            <div>
              <SearchRecipes />
              <RecipesCarousel mealType={this.state.meal_type}
                               // planName={this.props.plan_name}
                               onAddRecipe={this.recipe_changed}
              />
            </div>
          </Modal.Body>
          <Modal.Footer id="mpModalFooter">
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

// connects component to Redux store, so it can get data and use functions from the store.
export default connect(state2props)(DayPlanNew);

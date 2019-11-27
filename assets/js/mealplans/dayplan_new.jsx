import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router';
import _ from 'lodash';

import {Modal, Row, Col, Button, Table, ListGroup, Form, Alert} from 'react-bootstrap'
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
    this.setState({show_modal: false});
    this.setState({[meal_type]: recipe_title});
    this.changed(data);
  }

  // handles submit meal plan button click
  handleSubmit(event) {
    event.preventDefault();
    this.setState({breakfast:""});
    this.setState({lunch:""});
    this.setState({dinner:""});
    this.setState({snack:""});
    ReactDOM.findDOMNode(this.messageForm).reset();
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

  handleButtonClick(params) {
    console.log('this in handle button is', params);
    if (this.props.forms.test_create_new_day_plan.breakfast
        || this.props.forms.test_create_new_day_plan.lunch
        || this.props.forms.test_create_new_day_plan.dinner
        || this.props.forms.test_create_new_day_plan.snack
    ) {
      createNewDayPlan(params);
    } else {
      alert("must add at least one meal");
    }
  }

  render() {
    let user_id = this.props.session.user_id;
    let plan_name = this.props.plan_name;
    console.log("props in dayplan new", this.props);

    return (
      <div>
        <h1 id="mpHeader">Daily Meal Plan</h1>
        <Form
          id='dayplanForm'
          className="dpForm"
          ref={ dpForm => this.messageForm = dpForm }
          onSubmit={this.handleSubmit.bind(this)}
        >
          <Form.Group as={Row} controlId="mealPlanDate">
            <Form.Label column sm="2">Date</Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="date"
                onChange={(ev) => this.changed(
                  {date: ev.target.value, userId: user_id.toString(), mealPlanName: plan_name}
                )}
              />
            </Col>
          </Form.Group>

          {this.state.show_alert == true &&
           <Alert variant="danger">create a plan name first</Alert>
          }

          <ListGroup>
            <ListGroup.Item className="dailyMPHeading">
              BREAKFAST
              <Button className="mpBtn" onClick={() => this.handleShow("breakfast")}>+</Button>
            </ListGroup.Item>
            {this.state.breakfast && <ListGroup.Item>{this.state.breakfast}</ListGroup.Item>}
          </ListGroup>

          <ListGroup>
            <ListGroup.Item className="dailyMPHeading">
              LUNCH
              <Button className="mpBtn" onClick={() => this.handleShow("lunch")}>+</Button>
            </ListGroup.Item>
            {this.state.lunch && <ListGroup.Item>{this.state.lunch}</ListGroup.Item>}
          </ListGroup>

          <ListGroup>
            <ListGroup.Item className="dailyMPHeading">
              DINNER
              <Button className="mpBtn" onClick={() => this.handleShow("dinner")}>+</Button>
            </ListGroup.Item>
            {this.state.dinner && <ListGroup.Item>{this.state.dinner}</ListGroup.Item>}
          </ListGroup>

          <ListGroup>
            <ListGroup.Item className="dailyMPHeading">
              SNACK
              <Button className="mpBtn" onClick={() => this.handleShow("snack")}>+</Button>
            </ListGroup.Item>
            {this.state.snack && <ListGroup.Item>{this.state.snack}</ListGroup.Item>}
          </ListGroup>

          {console.log("in the render", this)}
          <Button id="savePlanBtn"
                  type="submit"
                  onClick={() => this.handleButtonClick(this)}>
            Save Daily Plan
          </Button>
        </Form>

        <Modal id="mpModal"
               show={this.state.show_modal}
               onHide={this.handleClose}>
          <Modal.Header id="mpModalHeader" closeButton>
            <Modal.Title>Add to Meal Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body id="mpModalBody">
            <div>
              <SearchRecipes/>
              <RecipesCarousel
                mealType={this.state.meal_type}
                onAddRecipe={this.recipe_changed}
              />
            </div>
          </Modal.Body>
          <Modal.Footer id="mpModalFooter">
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

// connects component to Redux store, so it can get data and use functions from the store.
export default connect(state2props)(DayPlanNew);

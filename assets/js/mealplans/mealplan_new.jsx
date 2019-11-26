import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import {Modal, Row, Col, Button, Table, Form} from 'react-bootstrap'
import DayPlanNew from './dayplan_new';
import SearchRecipes from '../recipes/search'
import {createNewMealPlan} from "../ajax";

// Send events from component to redux store.
// Return "state" instead of "state.forms.test_create_new_meal_plan"
// so that we can access the session data in props.
function state2props(state) {
  return state;
}

class MealPlanNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      show_form: true,
      plan_name: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_MEAL_PLAN_NAME',
      data: data,
    })
  }

  handleSubmit(ev){
    // prevent page reload after submitting form
    ev.preventDefault();
    // a very convoluted way to get the meal plan name for a submitted meal plan
    // and keep it in local state in order to pass it down to DayMealPlan component
    let mp_name =  ev.target.elements.mealPlanName.value;
    this.setState({plan_name: mp_name});
    // one the user submit a meal plan name, the form should disappear
    this.setState({show_form: false});
  }

  render() {
    let user_id = this.props.session.user_id;

    // Don't show the meal plan form if the user already create one
    if (this.state.show_form === false) {
      let plan_name = this.state.plan_name;
      return (
        <div>
          <h4>{plan_name} PLAN</h4>
          <DayPlanNew plan_name={plan_name}/>
        </div>
      );
    }

    return (
      <div>
        <h2>Create a New Meal Plan</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="mealPlanName">
            <Form.Label column sm="2">Plan Name</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={"enter a name for your meal plan"}
                onChange={(ev) =>
                  this.changed({mealPlanName: ev.target.value, userId: user_id})
                }/>
            </Col>
          </Form.Group>
          <Form.Group controlId="submit">
            <Button type="submit"
                    variant="primary"
                    onClick={() => createNewMealPlan(this)}>
              create meal plan</Button>
          </Form.Group>
        </Form>

        <br/>
        <DayPlanNew plan_name={this.state.plan_name}/>
      </div>
    );
  }
}

// connects component to Redux store, so it can get data and use functions from the store.
export default connect(state2props)(MealPlanNew);

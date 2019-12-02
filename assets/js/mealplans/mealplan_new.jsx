import React from 'react';
import {connect} from 'react-redux';

import {Modal, Row, Col, Button, Table, Form} from 'react-bootstrap'
import DayPlanNew from './dayplan_new';
import MealPlanShow from './mealplan_show';
import {createNewDayPlan, createNewMealPlan, getMealPlan} from "../ajax";

function state2props(state) {
  return state;
}

class MealPlanNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_form: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  changed(data) {
    this.props.dispatch({
                          type: 'CHANGE_NEW_MEAL_PLAN_NAME',
                          data: data,
                        })
  }

  // handle submit for a meal plan
  handleSubmit(ev) {
    // prevent page reload after submitting form
    ev.preventDefault();
    // once the user submit a meal plan name, the form should disappear
    this.setState({show_form: false});
  }

  refreshPage(ev) {
    this.setState( {show_form: true} );
  }

  render() {

    if(!this.props.session)
    {
      return (
        <h3 style =
          {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
            Please login to create Meal Plans.
        </h3>
      );
    }

    let user_id = this.props.session.user_id;
    let mealplan = this.props.mealplans.create_new_mealplan_resp;

    let bottom =
      <Row>
        <Col sm={4} md={6}>
          <DayPlanNew plan_name={mealplan.meal_plan_name}/>
        </Col>
        <Col sm={4} md={6}>
          <MealPlanShow mealplan={mealplan}/>
        </Col>
      </Row>;

    // Don't show the meal plan form if the user already created one
    if (this.state.show_form === false || this.props.redirect_from === true) {
      return (
        <div>
          <Row>
            <h4>MEAL PLAN NAME: {mealplan.meal_plan_name}</h4>
            <Button variant="danger" onClick={this.refreshPage}>Create New Meal Plan</Button>
          </Row>
          {bottom}
        </div>
      );
    }

    // Otherwise show the meal plan form at the top of page
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
        {bottom}
      </div>
    );
  }
}

// connects component to Redux store, so it can get data and use functions from the store.
export default connect(state2props)(MealPlanNew);

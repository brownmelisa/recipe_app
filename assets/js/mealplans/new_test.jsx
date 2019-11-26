import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { createNewMealPlan } from '../ajax';

function state2props(state) {
  return ({});
}

class TestNewMp extends React.Component
{
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  changed(data)
  {
    this.props.dispatch({
      type: 'CHANGE_NEW_MEAL_PLAN_NAME',
      data: data,
    });
  }

  userIdChanged(ev)
  {
    let input = ev.target.value;
    let userId = null;
    if(input.length > 0)
    {
      userId = input;
    }
    // add to state
    this.changed({userId: userId});
  }

  mealPlanNameChanged(ev)
  {
    let input = ev.target.value;
    let mealPlanName = null;
    if(input.length > 0)
    {
      mealPlanName = input;
    }
    // add to state
    this.changed({mealPlanName: mealPlanName});
  }

  render()
  {
    return(
      <div>
        <h2>Test page for creating meal plan</h2>
        <Form.Group controlId="mealPlanName">
          <Form.Label>Enter Meal Plan Name: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.mealPlanNameChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>Enter User ID (To be picked from session later): </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.userIdChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => createNewMealPlan(this)}>
                  Create</Button>
        </Form.Group>
      </div>
    );

  }
}

export default connect(state2props)(TestNewMp);

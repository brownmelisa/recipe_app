import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { createNewDayPlan } from '../ajax';

function state2props(state) {
  return ({});
}

class TestNewDp extends React.Component
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
      type: 'CHANGE_NEW_DAY_PLAN_NAME',
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

  dateChanged(ev)
  {
    let input = ev.target.value;
    let date = null;
    if(input.length > 0)
    {
      date = input;
    }
    // add to state
    this.changed({date: date});
  }
  breakfastChanged(ev)
  {
    let input = ev.target.value;
    let breakfast = null;
    if(input.length > 0)
    {
      breakfast = input;
    }
    // add to state
    this.changed({breakfast: breakfast});
  }

  lunchChanged(ev)
  {
    let input = ev.target.value;
    let lunch = null;
    if(input.length > 0)
    {
      lunch = input;
    }
    // add to state
    this.changed({lunch: lunch});
  }
  dinnerChanged(ev)
  {
    let input = ev.target.value;
    let dinner = null;
    if(input.length > 0)
    {
      dinner = input;
    }
    // add to state
    this.changed({dinner: dinner});
  }
  snackChanged(ev)
  {
    let input = ev.target.value;
    let snack = null;
    if(input.length > 0)
    {
      snack = input;
    }
    // add to state
    this.changed({snack: snack});
  }

  render()
  {
    return(
      <div>
        <h2>Test page for creating daily plan</h2>
        <Form.Group controlId="mealPlanName">
          <Form.Label>Enter Meal Plan Name (To come from the state later):</Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.mealPlanNameChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>Enter User ID (To be picked from session later): </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.userIdChanged(ev)}/>
        </Form.Group>
        // date, breakfast, lunch, dinner, snack
        <Form.Group controlId="date">
          <Form.Label>Date: </Form.Label>
          <Form.Control type="date"
            onChange={(ev) => this.dateChanged(ev)}/>
        </Form.Group>

        <Form.Group controlId="userId">
          <Form.Label>Breakfast: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.breakfastChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>Lunch: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.lunchChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>Dinner: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.dinnerChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="userId">
          <Form.Label>Snack: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.snackChanged(ev)}/>
        </Form.Group>

        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => createNewDayPlan(this)}>
                  Add to Meal Plan</Button>
        </Form.Group>
      </div>
    );

  }
}

export default connect(state2props)(TestNewDp);

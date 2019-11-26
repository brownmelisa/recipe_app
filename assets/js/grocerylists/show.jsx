import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { getGroceryList } from '../ajax';

function state2props(state) {
  return ({});
}

class TestGetGc extends React.Component
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
      type: 'CHANGE_GET_GROCERY_LIST',
      data: data,
    });
  }

  mealPlanIdChanged(ev)
  {
    let input = ev.target.value;
    let mealPlanId = null;
    if(input.length > 0)
    {
      mealPlanId = input;
    }
    // add to state
    this.changed({mealPlanId: mealPlanId});
  }

  render()
  {
    return(
      <div>
        <h2>Test page for getting Grocery List</h2>
        <Form.Group controlId="mealPlanId">
          <Form.Label>Enter Meal Plan ID: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.mealPlanIdChanged(ev)}/>
        </Form.Group>

        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => getGroceryList(this)}>
                  Get</Button>
        </Form.Group>
      </div>
    );

  }
}

export default connect(state2props)(TestGetGc);

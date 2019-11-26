import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { getAllMealPlans } from '../ajax';

function state2props(state) {
  return ({});
}

class TestGetAllMps extends React.Component
{
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }



  render()
  {
    return(
      <div>
        <h2>Test page for getting all meal plans for logged in user</h2>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => getAllMealPlans(this)}>
                  Get</Button>
        </Form.Group>
      </div>
    );

  }
}

export default connect(state2props)(TestGetAllMps);

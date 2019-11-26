import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from './store';

import { getRecipe } from './ajax';

function state2props(state) {
  return ({});
}

class TestPage extends React.Component
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
      type: 'CHANGE_GET_RECIPE_TEST',
      data: data,
    });
  }

  recipeIdChanged(ev)
  {
    let input = ev.target.value;
    let recipeId = null;
    if(input.length > 0)
    {
      recipeId = input;
    }
    // add to state
    this.changed({recipeId: recipeId});
  }

  render()
  {
    return(
      <div>
        <h2>Test Page for server side API calls</h2>
        <Form.Group controlId="searchTerm">
          <Form.Label>Recipe ID: </Form.Label>
          <Form.Control type="text"
            onChange={(ev) => this.recipeIdChanged(ev)}/>
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => getRecipe(this)}>
                  Search</Button>
        </Form.Group>
      </div>
    );
  }
}


export default connect(state2props)(TestPage);

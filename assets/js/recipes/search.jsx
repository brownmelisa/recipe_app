import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { searchRecipes } from '../ajax';

function state2props(state) {
  return ({});
}

class SearchRecipes extends React.Component
{
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data)
  {
    this.props.dispatch({
      type: 'CHANGE_SEARCH_RECIPE',
      data: data,
    });
  }

  searchTermChanged(ev)
  {
    let input = ev.target.value;
    let searchTerm = null;
    if(input.length > 0)
    {
      searchTerm = input;
    }
    // add to state
    this.changed({searchTerm: searchTerm});
  }

  cuisineChanged(ev)
  {
    let input = ev.target.value;
    let cuisine = null;
    if(input.length > 0)
    {
      cuisine = input;
    }
    this.changed({cuisine: cuisine});
  }

  mealTypeChanged(ev)
  {
    let input = ev.target.value;
    let type = null;
    if(input.length > 0)
    {
      type = input;
    }
    this.changed({type: type});
  }

  render()
  {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    console.log(this);

    return(
      <div>
        <h2>Search Recipe</h2>
        <Row className='rowC'>

          <div>
            <Form.Group controlId="searchTerm">
              <Form.Label>Keywords: </Form.Label>
              <Form.Control type="text"
                onChange={(ev) => this.searchTermChanged(ev)} />
            </Form.Group>
          </div>

          <div>
            <Form.Group controlId="cuisine">
              <Form.Label>Cuisine: </Form.Label>
              <Form.Control type="text"
                onChange={(ev) => this.cuisineChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="mealType">
              <Form.Label>Meal Type: </Form.Label>
              <Form.Control as="select"
                onChange={(ev) => this.mealTypeChanged(ev)}>
                <option></option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Row>


        <Form.Group controlId="submit">
          <Button variant="primary"
            onClick={() => searchRecipes(this)}>
            Search</Button>
        </Form.Group>
        </div>

    );
  }

}

export default connect(state2props)(SearchRecipes);

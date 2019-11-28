import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert, Col, Row, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import { searchRecipes } from '../ajax';

function state2props(state) {
  return ({});
}

class SearchRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open_collapse: false,
      redirect: null,
    }
  }

  change_collapse(_ev) {
    this.setState({ open_collapse: !this.state.open_collapse })
  }

  redirect(path) {
    this.setState({ redirect: path });
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_SEARCH_RECIPE',
      data: data,
    });
  }

  searchTermChanged(ev) {
    let input = ev.target.value;
    let searchTerm = null;
    if (input.length > 0) {
      searchTerm = input;
    }
    // add to state
    this.changed({ searchTerm: searchTerm });
  }

  cuisineChanged(ev) {
    let input = ev.target.value;
    let cuisine = null;
    if (input.length > 0) {
      cuisine = input;
    }
    this.changed({ cuisine: cuisine });
  }

  validate(ev) {
    let input = ev.target.value;
    let out = null;
    if (input.length > 0) {
      out = input;
    }
    return out
  }

  mealTypeChanged(ev) {
    this.changed({ type: this.validate(ev) });
  }

  multiIngredientChanged(ev) {
    this.changed({ multiIngredient: this.validate(ev) });
  }

  maxCalChanged(ev) {
    this.changed({ maxCal: this.validate(ev) })
  }

  maxFatChanged(ev) {
    this.changed({ maxFat: this.validate(ev) });
  }

  maxProteinChanged(ev) {
    this.changed({ maxProtein: this.validate(ev) });
  }

  maxCarbChanged(ev) {
    this.changed({ maxCarb: this.validate(ev) })
  }

  advance_search() {
    return (
      <Row>
        <Form className="form-inline">
          <div>
            <Form.Group className="m-3" controlId="multiIngridient">
              <Form.Label>Multiple Ingridient Search: </Form.Label>
              <Form.Control type="text"
                onChange={(ev) => this.multiIngredientChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxCalorie">
              <Form.Label>Max Calorie: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxCalChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxFat">
              <Form.Label>Max Fat: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxFatChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxCabs">
              <Form.Label>Max Carbs: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxCarbChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxProtein">
              <Form.Label>Max Protein: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxProteinChanged(ev)} />
            </Form.Group>
          </div>

        </Form>
      </Row>);
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    console.log(this);

    return (
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
          <Button
            onClick={() => this.change_collapse()}
            aria-controls="example-collapse-text"
            aria-expanded={this.state.open_collapse}
            variant="link">
            Advance Search
          </Button>
          <Collapse in={this.state.open_collapse}>
            <div className="card card-body">
              {this.advance_search()}
            </div>
          </Collapse>

        </Row>


        <Form.Group controlId="submit">
          <Button variant="primary"
            onClick={(ev) => {
              event.preventDefault();
              searchRecipes(this)
            }}>
            Search</Button>
        </Form.Group>
      </div>

    );
  }

}

export default connect(state2props)(SearchRecipes);

import React from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Alert, Row, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';


import { searchRecipes } from '../ajax';

function state2props(state) {
  return ({ search_recipes: state.forms.search_recipes });
}

class SearchRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open_collapse: false,
      redirect: null,
      display_error: false,
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

  validate_search() {
    let keyword = this.props.search_recipes.searchTerm;
    if (!(keyword)) {
      this.setState({ display_error: true })
      return false;
    } else {
      return true;
    }
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
              <Form.Label className="searchFormLabel">Multiple Ingredient Search: </Form.Label>
              <Form.Control type="text"
                onChange={(ev) => this.multiIngredientChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxCalorie">
              <Form.Label className="searchFormLabel">Max Calorie: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxCalChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxFat">
              <Form.Label className="searchFormLabel">Max Fat: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxFatChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxCabs">
              <Form.Label className="searchFormLabel">Max Carbs: </Form.Label>
              <Form.Control type="number"
                onChange={(ev) => this.maxCarbChanged(ev)} />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="m-3" controlId="maxProtein">
              <Form.Label className="searchFormLabel">Max Protein: </Form.Label>
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
    let body = <div className="container">
      <h2>Search Recipes</h2>
      <Form className="form-inline">

        <div>
          <Form.Group className="m-3" controlId="searchTerm">
            <Form.Label className="searchFormLabel">Keyword(required):</Form.Label>
            <Form.Control type="text"
              value={this.props.searchTerm}
              onChange={(ev) => this.searchTermChanged(ev)} />
          </Form.Group>
        </div>

        <div>
          <Form.Group className="m-3" controlId="cuisine">
            <Form.Label className="searchFormLabel">Cuisine: </Form.Label>
            <Form.Control type="text"
              onChange={(ev) => this.cuisineChanged(ev)} />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="m-3" controlId="mealType">
            <Form.Label className="searchFormLabel">Meal Type: </Form.Label>
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
          Advanced Search
        </Button>
      </Form>

      <Collapse in={this.state.open_collapse}>
        <div className="card card-body">
          {this.advance_search()}
        </div>
      </Collapse>
      <Form.Group controlId="submit">
        <Button variant="primary"
          onClick={(ev) => {
            if (this.validate_search()) {
              searchRecipes(this)
            }
          }}>
          Search</Button>
      </Form.Group>
    </div>;

    if (this.state.display_error) {
      return (
        <div>
          <Alert variant="danger" dismissible
            onClose={() => { this.setState({ display_error: false }) }}>
            Keywords is required
          </Alert>
          {body}
        </div>
      );
    } else {
      return (<div>
        {body}
      </div>)
    }

  }

}

export default connect(state2props)(SearchRecipes);

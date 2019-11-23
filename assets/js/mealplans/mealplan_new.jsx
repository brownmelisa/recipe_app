import React, {useState} from 'react';
import {Redirect} from 'react-router';
import _ from 'lodash';

import {Collapse, Modal, Container, ButtonToolbar, Row, Col, Button, Table, Form, ListGroup} from 'react-bootstrap'
import SearchRecipes from '../recipes/search'
import MealsShow from './meals_show'
import RecipesCarousel from './recipes_carousel'
import RecipesCarouselTest from './recipes_carousel_test';
import Home from '../tabs/home';

export default class MealplanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      show_modal: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  // handles submit meal plan button click
  handleSubmit(event) {
    alert('form was submitted: ' + event.target.value);
    event.preventDefault();
  }

  handleClose(ev) {
    this.setState({show_modal: false});
  }

  handleShow(ev) {
    this.setState({show_modal: true});
  }

  handleAddMeal(ev, name) {
    console.log("meal to add", ev.target);
    alert('meal added' + ev.target.value);
    console.log('recipe name', name);
  }

  render() {

    return (
      <div>
        <h1 id="mpHeader">
          Daily Meal Plan
        </h1>
        <Row>
          <Col sm={4} md={6}>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="mealPlanDate">
                <Form.Label column sm="2">Date</Form.Label>
                <Col sm="10">
                <Form.Control type="date"/>
                </Col>
              </Form.Group>

              <Table striped hover id="breakfastTable">
                <thead>
                  <tr>
                    <th width="80%">BREAKFAST</th>
                    <th width="20%"><Button className="mpBtn" onClick={this.handleShow}>+</Button></th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </Table>

              <Table striped hover id="lunchTable">
                <thead>
                <tr>
                  <th width="80">LUNCH</th>
                  <th width="20%"><Button className="mpBtn" onClick={this.handleShow}>+</Button></th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </Table>

              <Table striped hover id="dinnerTable">
                <thead>
                <tr>
                  <th width="80">DINNER</th>
                  <th width="20%"><Button className="mpBtn" onClick={this.handleShow}>+</Button></th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </Table>

              <Button id="savePlanBtn" type="submit">Save Plan</Button>
            </Form>


          </Col>

          <Col sm={4} md={6}>
            Add something here
            <br />
          </Col>
        </Row>

        <Modal id="mpModal" show={this.state.show_modal} onHide={this.handleClose}>
          <Modal.Header id="mpModalHeader" closeButton>
            <Modal.Title>Add to Meal Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body id="mpModalBody">
            <div>
              <SearchRecipes />
              <RecipesCarouselTest/>
            </div>
          </Modal.Body>
          <Modal.Footer id="mpModalFooter">
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}


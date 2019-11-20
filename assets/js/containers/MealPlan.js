import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import RecipeCard from './../recipe/card';

const meal_plan = ( props ) => {

  return (
    <div>
      <h1>
        In the meal plan container
      </h1>
      <Row>
        <Col>
          Date <input></input>
          <div>
          Pick your Meal
          <ul>
            <li>
              Breakfast <Button>+</Button>
              <div>Meal Name1</div>
            </li>
            <li>
              Lunch <Button>+</Button>
              <div>Meal Name2</div>
            </li>
            <li>
              Dinner <Button>+</Button>
              <div>Meal Name3</div>
            </li>
            <li>
              Snack <Button>+</Button>
              <div>Meal Name3</div>
            </li>
          </ul>
          </div>
          <Button>Save Plan</Button>
        </Col>

        <Col>
          Grocery List
          <Row>
            <Col>Item</Col>
            <Col>Qty</Col>
            <Col>Price</Col>
          </Row>
          <Row>
            <Col />
            <Col>Total Cost: $100</Col>
          </Row>
        </Col>
      </Row>
    </div>
);
};

export default meal_plan;

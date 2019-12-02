import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router';
import {Form, Button, Alert, Card, Row, Modal, Accordion} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteMealPlan, getAllMealPlans, getGroceryList} from '../ajax';
import RecipePage from './../recipes/recipe_page';
import GroceryList from "./grocery_list";
import SearchRecipes from "../recipes/search";
import RecipesCarousel from "./recipes_carousel";
import DayPlanNew from "./dayplan_new";
import MealDescription from "./meal_description";

function state2props(state) {
  return state;
}

class MealPlanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_modal: false,
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleShowModal(ev) {
    console.log("in show modal");
    this.setState({show_modal: true});
  }

  handleCloseModal() {
    console.log("in handle close modal");
    this.setState({show_modal: false});
    // for component to rerender
    // this.forceUpdate();
    this.setState({ state: this.state });
  }

  render() {
    console.log("in meal plan card dayPlans ", this.props.mp);
    let groceries = this.props.mealplans.get_gl_by_mpid_resp.data;
    console.log("grocery list contains", groceries);
    let dayplans = this.props.mp.dayPlans.map(dp => {
      return (<DayPlanList key={dp.id} dp={dp}/>);
    });

    console.log("show in main", this.state.show_modal);
    return(
      <Card className="col-4">
        <Card.Title>Meal Plan Name: {this.props.mp.meal_plan_name} </Card.Title>
        {dayplans}
        <div>
          <Button onClick={() => this.props.redirect(this.props.mp.id) }>grocery list</Button>
          <Button onClick={() => this.handleShowModal()}>add new day</Button>
          <Button onClick={() => this.props.handleDeleteMealPlan(this.props.mp.id) }>delete</Button>
        </div>


        <Modal show={this.state.show_modal}
               onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Meal Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body id="mpModalBody">
            <DayPlanNew plan_name={this.props.mp.meal_plan_name}/>
          </Modal.Body>
          <Modal.Footer id="mpModalFooter">
            <Button variant="secondary"
                    onClick={this.handleCloseModal}
            >Close</Button>
          </Modal.Footer>
        </Modal>
      </Card>
    )
  }
}

export default connect(state2props)(MealPlanCard);


// Display info from a day plan
function DayPlanList({dp}) {

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h6>{dp.date}</h6>
            </Accordion.Toggle>
            <Button onClick={() => { deleteDayPlan(dp.id) }}>delete</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {/*conditional rendering if meal exists in day plan*/}
              {dp.breakfast &&
               <div>
                 <p>Breakfast</p>
                 <MealDescription meal={dp.breakfast}/>
               </div>
              }
              {dp.lunch &&
               <div>
                 <p>Lunch</p>
                 <MealDescription meal={dp.lunch}/>
               </div>
              }
              {dp.dinner &&
               <div>
                 <p>Dinner</p>
                 <MealDescription meal={dp.dinner}/>
               </div>
              }
              {dp.snack &&
               <div>
                 Snack
                 <MealDescription meal={dp.snack}/>
               </div>
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

// Grabs details from meal, or returns null if meal is blank
function MealDescription({meal}) {
  console.log("IM MEAL DESCRIPTION, meal is", meal);
  if (meal) {
    return (
      <div>
        <span>{meal.title}</span>
        <p className="p_meal_detail">Calories: {meal.calories}</p>
        <p className="p_meal_detail">Carbs: {meal.carbs}</p>
        <p className="p_meal_detail">Protein: {meal.protein}</p>
        <p className="p_meal_detail">Fat: {meal.fats}</p>
        <p className="p_meal_detail">Price Per Serving: ${meal.pricePerServing.toFixed(2)}</p>
      </div>
    )
  }
  return null;
}

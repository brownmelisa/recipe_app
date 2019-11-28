import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Form, Button, Alert, Card, Row, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import { deleteMealPlan, getAllMealPlans, getGroceryList, deleteDayPlan } from '../ajax';
import RecipePage from './../recipes/recipe_page';
import GroceryList from "./grocery_list";
import MealDescription from "./meal_description";

function state2props(state) {
  return state;
}

class MealPlansAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
    getAllMealPlans(this);
    this.redirectToGrocery = this.redirectToGrocery.bind(this);
  }


  redirectToCreateMP() {
    console.log("redirecting to new meal plan");
    this.setState({ redirect: "/mp/new" });
  }

  redirectToGrocery(mpid) {
    console.log("redirecting to grocery list");
    this.props.dispatch({
      type: 'CHANGE_GET_GROCERY_LIST',
      data: { mealPlanId: mpid },
    });
    getGroceryList(this);
    this.setState({ redirect: "/grocery/" + mpid });
  }

  render() {
    console.log("All Mealplans", this.props.mealplans);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    // redirect to create new meal plan if none exist
    if (this.props.mealplans.get_all_mealplans.data == undefined
      || this.props.mealplans.get_all_mealplans.data.length < 1) {
      // display something before redirecting
      return (
        <div>
          <Alert variant="warning" dismissible
            onClose={() => this.redirectToCreateMP()}>
            Let's create some meal plans first.
          </Alert>
        </div>
      )
    }

    // display the meal plan cards if they are loaded into store
    let groceries = this.props.mealplans.get_gl_by_mpid_resp.data
    console.log("grocery list contains", groceries);

    let mealplans = this.props.mealplans.get_all_mealplans.data;
    let mealplans_parsed = mealplans.map(mp => {
      return (<MealPlanCard key={mp.id} mp={mp} redirect={this.redirectToGrocery} />);
    });

    return (
      <div>
        <h2>MY MEAL PLANS DASHBOARD</h2>
        <Row>{mealplans_parsed}</Row>
        {/*render the grocery list if it exists*/}
        {groceries &&
          <GroceryList />
        }
      </div>
    );
  }
}

export default connect(state2props)(MealPlansAll);

//// The rest are all stateless function components ///////

// Display a meal plan in card format
function MealPlanCard({ mp, redirect }) {
  let dayplans = mp.dayPlans.map(dp => {
    return (<DayPlanList key={dp.id} dp={dp} />);
  });

  return (
    <Card className="col-4">
      <Card.Title>Meal Plan Name: {mp.meal_plan_name} </Card.Title>
      {dayplans}
      <div>
        <Button onClick={() => redirect(mp.id)}>grocery list</Button>
        <Button>details</Button>
        <Button onClick={() => deleteMealPlan(mp.id)}>delete</Button>
      </div>
      {console.log("meal plan id in card", mp.id)}
    </Card>
  )
}

// Display info from a day plan
function DayPlanList({ dp }) {
  let detail = <div>
    {
      dp.breakfast &&
      <div>
        <p>Breakfast</p>
        <MealDescription meal={dp.breakfast} />
      </div>
    }
    {
      dp.lunch &&
      <div>
        <p>Lunch</p>
        <MealDescription meal={dp.lunch} />
      </div>
    }
    {
      dp.dinner &&
      <div>
        <p>Dinner</p>
        <MealDescription meal={dp.dinner} />
      </div>
    }
    {
      dp.snack &&
      <div>
        Snack
         <MealDescription meal={dp.snack} />
      </div>
    }
  </div>;
  return (
    <div>
      {/*conditional rendering if meal exists in day plan*/}
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h6>{dp.date}</h6>
            </Accordion.Toggle>
            <Button onClick={() => { deleteDayPlan(dp.id) }}>delete</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{detail}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

    </div>
  )
}

// Grabs details from meal, or returns null if meal is blank
// function MealDescription({ meal }) {

//   console.log("IM MEAL DESCRIPTION, meal is", meal);
//   if (meal) {
//     return (
//       <div>
//         <Button variant="link">{meal.title}</Button>
//         <p className="p_meal_detail">Calories: {meal.calories}</p>
//         <p className="p_meal_detail">Carbs: {meal.carbs}</p>
//         <p className="p_meal_detail">Protein: {meal.protein}</p>
//         <p className="p_meal_detail">Fat: {meal.fats}</p>
//         <p className="p_meal_detail">Price Per Serving: ${meal.pricePerServing.toFixed(2)}</p>
//       </div>
//     )
//   }
//   return null;
// }

// Chuhan's functions
function Recipe({ recipe }) {
  return (
    <div>
      <h2>Recipe Name: {recipe.title}</h2>
      <img src={recipe.image_url} />
      <p>Calories: {recipe.calories}</p>
      <p>Carbs: {recipe.carbs}</p>
      <p>Fats: {recipe.fats}</p>
      <p>Protein: {recipe.protein}</p>
      <div className="ingr_and_instruction">
        <Ingredients ingredients={recipe.ingredients} />
        <Instruction instructions={recipe.instructions} />
      </div>

    </div>
  )
}

function Ingredients({ ingredients }) {
  let ingr_list = _.map(ingredients, (item) => {
    return <li key={item.ingr_id}>
      <p>
        <img src={item.ingr_image_url} />
        {item.ingr_amount} {item.ingr_unit} {item.ingr_name}</p>
    </li>
  });
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingr_list}
      </ul>
    </div>);
}

function Instruction({ instructions }) {
  let inst_list = _.map(instructions, (inst, id) => {
    return <li key={id}>
      {inst.step}
    </li>
  })
  return (
    <div>
      <h3>Instructions</h3>
      <ol> {inst_list} </ol>
    </div>);
}

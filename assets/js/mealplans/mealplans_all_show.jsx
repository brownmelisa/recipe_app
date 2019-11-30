import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router';
import {Form, Button, Alert, Card, Row, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {deleteMealPlan, getAllMealPlans, getGroceryList} from '../ajax';
import MealPlanCard from './mealplan_card';

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
    this.handleDeleteMealPlan = this.handleDeleteMealPlan.bind(this);
  }

  redirect(path) {
    this.setState({
                    redirect: path,
                  });
  }

  redirectToCreateMP() {
    this.setState({redirect: "/mp/new" });
  }

  redirectToGrocery(mpid) {
    this.props.dispatch({
      type: 'CHANGE_GET_GROCERY_LIST',
      data: {mealPlanId: mpid},
    });
    getGroceryList(this);

    // this.setState({redirect: "/grocery/" + mpid});
  }

  handleDeleteMealPlan(mpid) {
    this.props.dispatch({
      type: 'CHANGE_GET_MEAL_PLAN',
      data: {mealPlanId: mpid},
    });
    deleteMealPlan(this);
  }

  render() {
    console.log("All Mealplans", this.props.mealplans);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    // redirect to create new meal plan if none exist
    if (this.props.mealplans.get_all_mealplans.data === undefined
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
    let mealplans = this.props.mealplans.get_all_mealplans.data;
    let mealplans_parsed = mealplans.map(mp => {
      return (
        <MealPlanCard
          key={mp.id}
          mp={mp}
          redirect={this.redirectToGrocery}
          handleDeleteMealPlan={this.handleDeleteMealPlan}
        />);
    });

    return (
      <div>
        <h2>MY MEAL PLANS DASHBOARD</h2>
        <Row>{mealplans_parsed}</Row>
      </div>
    );
  }
}

export default connect(state2props)(MealPlansAll);

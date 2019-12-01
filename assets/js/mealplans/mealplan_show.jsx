import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import {connect} from 'react-redux';
import {get, getAllMealPlans, getMealPlan} from '../ajax';

// This component shows all the mealplans for the current loggin in User
function state2props(state) {
  return state;
}

class MealPlanShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      dates: [],
    };
    this.loadDetails = this.loadDetails.bind(this);
    this.getTotalDailyCalories = this.getTotalDailyCalories.bind(this);
    this.noDayPlanExists = this.noDayPlanExists.bind(this);
    getAllMealPlans(this);
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  loadDetails() {
    let dayplan = this.props.mealplans.create_new_dayplan_resp;
    // a day plan was submitted for this meal plan name
    if (dayplan.id) {
      console.log("LOAD DETAIL RUN");
      // this.setState({dates: this.state.dates.concat(dayplan.date)});
    }
  }

  getTotalDailyCalories(dp) {
    // let meals = ["breakfast", "lunch", "dinner", "snack"];
    // let total_cal = meals.map(meal_name => {
    //             if (dp[meal_name]) {
    //               console.log("calories: ", dp[meal_name].calories);
    //               return this.acc += dp[meal_name].calories
    //             }
    //           }, {acc: 0}
    //   );
    // console.log("total calories", total_cal);
    // return total_cal;
    return 2000;
  }

  noDayPlanExists(get_all_mp_results){
    // no day plans created at all for this user
    if (get_all_mp_results.data === undefined) {
      console.log("no day plans created");
      return true;
    }
    let get_mps = get_all_mp_results.data;
    let current_mealplan = get_mps.filter(mp => mp.id === this.props.mealplan.id);

    console.log("current meal plan is", current_mealplan);
    console.log("current meal plan equal null", current_mealplan === null);
    console.log("current meal plan zero", current_mealplan[0]);
    console.log("current meal plan dayplans", current_mealplan[0].dayPlans);

    // console.log("current meal plan length", current_mealplan[0].dayPlans.length);

    // console.log("current meal plan is", current_mealplan[0].dayPlans);

    // day plans exist for current meal plan
    if (current_mealplan !== null && current_mealplan.length > 0) {
      console.log("print ");
      // day plans are created, but not for this meal plan
      return false;
    }

    console.log("returning true");
    return true;
  }


  render() {
    console.log("In mealplan show", this.props);

    // getComments()

    // meal plan not yet created
    // Use lodash isEmpty() function to check for empty object
    if (_.isEmpty(this.props.mealplan) || this.noDayPlanExists(this.props.mealplans.get_all_mealplans)) {
      console.log("in empty");
      return (
        <div>
          <h3>This meal plan is empty</h3>
        </div>
      )
    }

    let get_mps = this.props.mealplans.get_all_mealplans.data;
    let current_mealplan = get_mps.filter(mp => mp.id === this.props.mealplan.id);

    let dp_parsed =
      current_mealplan[0].dayPlans.map(dp => {
        return (
          <div>
            <p>{dp.date}</p>
            <p>total daily cal: {this.getTotalDailyCalories(dp)}</p>
          </div>
        )
      });

    return (
      <div>
        <h1>Show Current Meal Plan Details</h1>
        <p>Meal Plan Name: {this.props.mealplan.meal_plan_name}</p>
        <p>Plan Created for Dates</p>
        {dp_parsed}
      </div>
    );
  }
}

export default connect(state2props)(MealPlanShow);

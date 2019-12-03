import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Col, Row, ListGroup, Table} from 'react-bootstrap';

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
    this.getMealPlanCalories = this.getMealPlanCalories.bind(this);
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
    console.log("dp in get total daily caloried is", dp);
    let meals = ["breakfast", "lunch", "dinner", "snack"];
    let cal_array = meals.map(function (meal) {
      if(dp[meal]) {
        return dp[meal].calories;
      }
    });
    let filtered_num = cal_array.filter(Number);
    let total_cal = filtered_num.reduce((acc, cur) => {
      return acc + cur;
    });
    // getAllMealPlans(this);
    return parseInt(total_cal);
  }

  getMealPlanCalories(current_mp) {
    console.log("current meal plan is", current_mp);
    console.log("day plan is", current_mp[0].dayPlans[0]);
    // let calorie_array = current_mp[0].dayPlans.map( function (dp) {
    //   console.log("dp in get meal plan is", dp);
    //   return this.getTotalDailyCalories(dp);
    // });
    // console.log("calorie array is", calorie_array);
    return 2000;
  }

  // checks if day plan exists for current meal plan
  noDayPlanExists(get_all_mp_results){
    let get_mps = get_all_mp_results.data;
    let current_mealplan = get_mps.filter(mp => mp.id === this.props.mealplan.id);
    // current meal doesn't have day plan
    if (current_mealplan.length === 0 || current_mealplan[0].dayPlans.length === 0) {
      return true;
    }
    return false;
  }


  render() {
    console.log("In mealplan show", this.props);
    // meal plan not yet created
    // Use lodash isEmpty() function to check for empty object
    if (_.isEmpty(this.props.mealplan)
        || this.noDayPlanExists(this.props.mealplans.get_all_mealplans)) {
      console.log("in empty");
      return (
        <div>
          <h3 className="dpHeader">Daily Plans Added</h3>
        </div>
      )
    }

    let get_mps = this.props.mealplans.get_all_mealplans.data;
    let current_mealplan = get_mps.filter(mp => mp.id === this.props.mealplan.id);

    let dp_parsed =
      current_mealplan[0].dayPlans.map(dp => {
        console.log("dp is", dp);
        return (
          <tr key={dp.id}>
            <td>{dp.date}</td>
            <td>{this.getTotalDailyCalories(dp)}</td>
          </tr>
        )
      });

    return (
      <div>
        <h3 className="dpHeader">Daily Plans Added</h3>
        {/*<p>Meal Plan Name: {this.props.mealplan.meal_plan_name}</p>*/}
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Meal Plan Date</th>
            <th>Total Daily Calories</th>
          </tr>
          </thead>
          <tbody>
          {dp_parsed}
          {/*<tr>*/}
          {/*  <td>Total Mealplan Calories</td>*/}
          {/*  <td>{this.getMealPlanCalories(current_mealplan)}</td>*/}
          {/*</tr>*/}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(state2props)(MealPlanShow);

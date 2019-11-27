import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {get, getMealPlan} from '../ajax';

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

  render() {
    console.log("In mealplan show", this.props);
    console.log("dayplans", this.state.dates);

    // meal plan not yet created
    if (!this.props.mealplan) {
      return (
        <div>
          <h3>This meal plan is empty</h3>
        </div>
      )
    }

    return (
      <div>
        <h1>Show Current Meal Plan Details</h1>
        <p>Meal Plan ID: {this.props.mealplan.id}</p>
        <p>Meal Plan Name: {this.props.mealplan.meal_plan_name}</p>
        <p>Plan Created for Dates</p>
        {this.loadDetails()}
        <p>{this.state.dates}</p>
      </div>
    );
  }
}

export default connect(state2props)(MealPlanShow);



// END OF CODE, THE REST IS COMMENTS ON DATA FORMAT
/**
 * Summary Data for user with 3 meal plans, mealplan3 has two day plans. The other 2
 * meal plans have one day plan each. The newest is on top.
 * data:[
 *     0: {
 *         dayPlans: [
 *             0: {
 *                 breakfast: null
 *                 date: "2019-11-17"
 *                 dinner: null
 *                 id: 3   //this is the day plan id
 *                 lunch: null
 *                 snack: {
 *                     calories: 393,
 *                     carbs: "17.13g",
 *                     cookingMinutes: 10,
 *                     fats: "14.88g",
 *                     glutenFree: true,
 *                     id: 573591,       // this is the recipe id
 *                     image_url: "https://spoonacular.com/recipeImages/573591-556x370.jpg",
 *                     ingredients: (6) [
 *                         0: {
 *                            ingr_amount: 0.5,
 *                            ingr_id: 2009,
 *                            ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/chili-powder.jpg",
 *                            ingr_name: "chili powder",
 *                            ingr_unit: "tbsp"
 *                            },
 *                         1: {…},
 *                         2: {…},
 *                         3: {…},
 *                         4: {…},
 *                         5: {…}
 *                      ],
 *                     instructions: (5) [
 *                         0: {step: "Place oven on broil", step_number: 1},
 *                         1: {…},
 *                         2: {step: "Cover salmon filets with dry rub", step_number: 3},
 *                         3: {…},
 *                         4: {…}
 *                     ],
 *                     percentCarbs: 17.82,
 *                     percentFat: 34.84,
 *                     percentProtein: 47.34,
 *                     preparationMinutes: 5,
 *                     pricePerServing: 5.7429,
 *                     protein: "45.51g",
 *                     readyInMinutes: 15,
 *                     recipe_id: 573591,
 *                     servings: 2,
 *                     title: "Maple Glazed Salmon",
 *                     vegan: false,
 *                     vegetarian: false,
 *                 }
 *             },
 *             1: {
 *                 breakfast: null
 *                 date: "2019-11-28"
 *                 dinner: {...}
 *                 id: 4   //this is the day plan id
 *                 lunch: null
 *                 snack: {...}
 *              },
 *         ] length: 2 // length of dayplans, not sure where this goes
 *         id: 3,    // this is the meal plan id
 *         meal_plan_name: "mealplan3"
 *     }
 *     1: {
 *         dayPlans: [
 *             0: {
 *                 breakfast: null
 *                 date: "2019-11-27"
 *                 ...
 *             }
 *         ],
 *         id: 2,    // this is the meal plan id
 *         meal_plan_name: "my mealplan2"
 *     }
 *     2: {
 *         dayPlans: [
 *             0: {
 *                 breakfast: null
 *                 date: "2019-11-17"
 *                 dinner: null
 *                 id: 2   //this is the day plan id
 *                 lunch: null
 *                 snack: {...}
 *             }
 *        ]
 *        id: 1,    // this is the meal plan id
 *        meal_plan_name: "mealplan1"
 *      ]
 *     length: 3      // how many meal plans the user has
 * }
 *
 */

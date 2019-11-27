import {createStore, combineReducers} from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     search_recipes: {...},
 *     test_get_recipe_details,
 *     login,
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   recipes: 
 *      search_resp: {Map.new(
 *              1 => {id: 1, title: "", image_url: "", calories:1, fats:"1gm", *              carbs:"",   proteins: ""},
 *              ...),}
 *      get_recipe_by_id_resp: {detail for one recipe }
 *       
 * }
 */

function login(st0 = {email: "", password: "", errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

// submit the form for search for recipes by keyword
function search_recipes(st0 = {searchTerm: "", type: "", cuisine: ""}, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH_RECIPE':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

// change later
function test_get_recipe_details(st0 = {recipeId: ""}, action) {
  switch (action.type) {
    case 'CHANGE_GET_RECIPE_TEST':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function test_create_new_meal_plan(st0 = {mealPlanName: "", userId: ""}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_MEAL_PLAN_NAME':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function test_create_new_day_plan(st0 = {
  mealPlanName: "", date: "", breakfast: "",
  lunch: "", dinner: "", snack: "", userId: ""
}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_DAY_PLAN_NAME':
      console.log("in store create new day plan", action.data);
      // for the meals, instead of replacing need to concatenate
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers(
    {
      search_recipes,
      test_get_recipe_details,
      test_create_new_meal_plan,
      test_create_new_day_plan,
      login,
      new_comments,
    });
  return reducer(st0, action);
}

function new_comments(st0 = {user_id: 0, recipe_id: 0, comments: "", errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_COMMENTS':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function users(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_USERS':
      let st1 = new Map(st0);
      for (let user of action.data) {
        st1.set(user.id, user);
      }
      return st1;
    default:
      return st0;
  }
}

function comments(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_COMMENTS':
      let st1 = new Map(st0);
      for (let comment of action.data) {
        st1.set(comment.id, comment);
      }
      return st1;
    default:
      return st0;
  }
}

let st = [
  {
    "calories": 393.004,
    "carbs": "17.1274g",
    "fats": "14.8836g",
    "id": 573591,
    "image_url": "https://spoonacular.com/recipeImages/573591-312x231.jpg",
    "protein": "45.5059g",
    "recipe_id": 573591,
    "title": "Maple Glazed Salmon"
  },
  {
    "calories": 553.315,
    "carbs": "81.0196g",
    "fats": "6.70668g",
    "id": 591705,
    "image_url": "https://spoonacular.com/recipeImages/591705-312x231.jpg",
    "protein": "42.8016g",
    "recipe_id": 591705,
    "title": "Tuna & White Bean Salad"
  },
  {
    "calories": 284.076,
    "carbs": "35.2282g",
    "fats": "8.0963g",
    "id": 695118,
    "image_url": "https://spoonacular.com/recipeImages/695118-312x231.jpg",
    "protein": "19.114g",
    "recipe_id": 695118,
    "title": "Tuna & White Bean Salad"
  },
  {
    "calories": 196.771,
    "carbs": "7.5949g",
    "fats": "8.00845g",
    "id": 696698,
    "image_url": "https://spoonacular.com/recipeImages/696698-312x231.jpg",
    "protein": "23.083g",
    "recipe_id": 696698,
    "title": "Tuscan-Style Tuna Salad"
  },
  {
    "calories": 404.668,
    "carbs": "12.3164g",
    "fats": "22.4964g",
    "id": 775925,
    "image_url": "https://spoonacular.com/recipeImages/775925-312x231.jpg",
    "protein": "38.5209g",
    "recipe_id": 775925,
    "title": "Baked Mustard-Crusted Salmon With Asparagus and Tarragon"
  }
];

function search_resp(st0 = st, action) {
  switch (action.type) {
    case 'SEARCH_RECIPES_RESP':
      let st1 = new Array();
      console.log("recipe data", action.data)
      for (let recipe of action.data) {
        st1.push(Object.assign({}, recipe))
      }
      return st1;
    default:
      return st0;
  }
}

function get_recipe_by_id_resp(st0 = {}, action) {
  switch (action.type) {
    case 'GET_RECIPES_BY_ID_RESP':
      return Object.assign({}, action.data);
    default:
      return st0;
  }
}

function recipes(st0, action) {
  let reducer = combineReducers(
    {
      search_resp,
      get_recipe_by_id_resp,
    });
  return reducer(st0, action);
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers(
    {
      forms,
      users,
      recipes,
      session,
      comments,
    });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;

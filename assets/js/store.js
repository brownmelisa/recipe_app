import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     search_recipes: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   recipes: Map.new(
 *     1 => {id: 1, title: "", image_url: "", calories:1, fats:"1gm", carbs:"",
 *           proteins: ""},
 *     ...
 *   ),
 * }
 */

function search_recipes(st0 = {searchTerm: "", type: "", cuisine: ""}, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH_RECIPE':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    search_recipes,
  });
  return reducer(st0, action);
}

function users(st0 = new Map(), action) {
  return st0;
}

function recipes(st0 = new Map(), action) {
  return st0;
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    recipes,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;

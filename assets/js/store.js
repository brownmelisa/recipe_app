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

function login(st0 = { email: "", password: "", errors: null }, action) {
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

function search_recipes(st0 = { searchTerm: "", type: "", cuisine: "" }, action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_RECIPE':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}



// change later
function test_get_recipe_details(st0 = { recipeId: "" }, action) {
    switch (action.type) {
        case 'CHANGE_GET_RECIPE_TEST':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        search_recipes,
        test_get_recipe_details,
        login,
    });
    return reducer(st0, action);
}

function users(st0 = new Map(), action) {
    return st0;
}
function recipes(st0, action) {
    let reducer = combineReducers({
        search_resp,
    })
    return reducer(st0, action);
}

function search_resp(st0 = new Array(), action) {
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

function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        forms,
        users,
        recipes,
        session,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;

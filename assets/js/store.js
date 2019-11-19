import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';


/* Structure of store:
* {
    recipes: Map.new (
        1 => {id:1, name: "recipe_name", photo: data, ...}
    )
}
*/

function recipes(st0 = new Map(), action) {
    switch (action.type) {
        case 'GET_RECIPES':
            let st1 = new Map();
            for (let recipe of action.data) {
                st1.set(recipe.id, recipe)
            }
            return st1;
        default:
            return st0;
    }
}

function search(st0 = "", action) {
    switch (action.type) {
        case 'CHANGE_SEARCH':
            let st1 = action.data;
            return st1;
        default:
            return st0;
    }
}




function login(st0 = { email: "", password: "", errors: null }, action) {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}



function forms(st0, action) {
    let reducer = combineReducers({
        login,
    });
    return reducer(st0, action);
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


function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        recipes,
        search,
        forms,
        session,
    });
    return deepFreeze(reducer(st0, action));
}


let store = createStore(root_reducer);
export default store;

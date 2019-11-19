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

function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        recipes,
        search,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
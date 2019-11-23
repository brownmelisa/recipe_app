import store from './store';

export function post(path, body) {
  let state = store.getState();
  //let token = state.session.token;
  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;
  console.log("submit data:", data);

  post('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: { errors: JSON.stringify(resp.errors) },
        });
      }
    });
}

export function get(path) {
  let state = store.getState();
  //let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      //'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      //'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function createNewDayPlan(form)
{
  console.log("Inside create new day plan ajax");
  let state = store.getState();
  console.log(state);
  let newDayPlanForm = state.forms.test_create_new_day_plan;

  let url = '/dayplans/';

  // meal_plan_name and user_id will be used at server side to get mealplan_id
  post(url, {
    dayplan: {
      meal_plan_name: newDayPlanForm.mealPlanName,
      user_id: newDayPlanForm.userId,
      date: newDayPlanForm.date,
      breakfast: newDayPlanForm.breakfast,
      lunch: newDayPlanForm.lunch,
      dinner: newDayPlanForm.dinner,
      snack: newDayPlanForm.snack,
    }
  }).then((resp) => {
      console.log("Create Day Plan Resp", resp);
  });

}


export function createNewMealPlan(form)
{
  console.log("Inside create new meal plan ajax");
  let state = store.getState();
  let newMealPlanForm = state.forms.test_create_new_meal_plan;
  let mealPlanName = newMealPlanForm.mealPlanName;
  let userId = newMealPlanForm.userId;

  let url = '/mealplans/';
  post(url, {
    mealplan: {
      meal_plan_name: mealPlanName,
      user_id: userId
    }
  }).then((resp) => {
      console.log("Create Meal Plan Resp", resp);
  });
}

export function getRecipe(form) {
  console.log("Inside get recipe ajax");
  let state = store.getState();
  console.log("state in get recipe", state);
  let recipeId = state.forms.test_get_recipe_details.recipeId;
  console.log("Recipe id: ", recipeId);

  let url = '/recipes/' + recipeId;
  get(url)
    .then((resp) => {
      console.log("Get Recipe Resp", resp);
      store.dispatch({
        type: "GET_RECIPES_BY_ID_RESP",
        data: resp
      })
    });
}

export function searchRecipes(form) {
  console.log("Inside search ajax");
  let state = store.getState();
  let searchForm = state.forms.search_recipes;

  let searchTerm = searchForm.searchTerm;
  let cuisine = searchForm.cuisine;
  let type = searchForm.type;

  let url = '/recipes/search/';
  if (searchTerm.length > 0)
    url = url + 'query=' + searchTerm;
  else
    return; // TODO: show error message

  if (cuisine.length > 0)
    url = url + '&cuisine=' + cuisine;
  if (type.length > 0)
    url = url + '&type=' + type;
  console.log('url ', url);

  get(url)
    .then((resp) => {
      console.log("Search Resp", resp);
      store.dispatch({
        type: "SEARCH_RECIPES_RESP",
        data: resp.data
      })
    });
}

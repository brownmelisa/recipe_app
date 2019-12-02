import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function deleteHttpMethod(path) {
  console.log("Inside delete ajax handler");
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'delete',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

// CHANGE THIS or improve this function. Don't know how to handle server response.
export function deleteHttpDayPlanMethod(path) {
  console.log("Inside delete ajax handler");
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'delete',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  });
}

// test functions
export function getGroceryList(form) {
  console.log("Inside get gc ajax");
  let state = store.getState();
  let getGcForm = state.forms.test_get_grocerylist;
  let mealPlanId = getGcForm.mealPlanId;
  let url = '/grocerylist/' + mealPlanId;
  console.log('url', url);
  get(url)
    .then((resp) => {
      console.log("Get GC Resp", resp);
      store.dispatch({
        type: "GET_GL_BY_MPID_RESP",
        data: resp
      });
      form.redirect('/grocery/' + mealPlanId);
    });
}

export function getMealPlan(form) {
  console.log("Inside get meal plan ajax");
  let state = store.getState();
  let getMpForm = state.forms.test_get_mealplan_details;
  let mealPlanId = getMpForm.mealPlanId;
  let url = '/mealplans/' + mealPlanId;
  console.log('url', url);
  get(url)
    .then((resp) => {
      console.log("Get Recipe Resp", resp);
      store.dispatch({
        type: "GET_MEALPLAN_BY_ID_RESP",
        data: resp
      })
    });
}

export function deleteMealPlan(mealPlanId) {
  console.log("Inside delete meal plan ajax");
  // let state = store.getState();
  // let getMpForm = state.forms.test_get_mealplan_details;
  // let mealPlanId = getMpForm.mealPlanId;

  let url = '/mealplans/' + mealPlanId;
  console.log('url', url);
  deleteHttpMethod(url)
    .then((resp) => {
      console.log("Delete MP Resp", resp);
      store.dispatch({
        type: "GET_ALL_MEALPLANS_RESP",
        data: resp
      })
    });
}

export function deleteDayPlan(dayPlanId) {
  console.log("Inside delete day plan ajax");
  // let state = store.getState();
  // let dayPlanId = state.forms.deleteDayPlan.dayPlanId;
  let url = '/dayplans/' + dayPlanId;
  console.log('url', url);
  deleteHttpDayPlanMethod(url)
    .then((_resp) => {
      console.log("Delete MP Resp", _resp);
      let resp = "dommy";
      getAllMealPlans(resp)
    });
}


export function getAllMealPlans(form) {
  console.log("Inside get meal plan ajax");
  let url = '/mealplans';
  get(url)
    .then((resp) => {
      console.log("Get Recipe Resp", resp);
      store.dispatch({
        type: "GET_ALL_MEALPLANS_RESP",
        data: resp
      })
    });
}

// Adds a day plan inside the given meal plan
export function createNewDayPlan(form) {
  console.log("Inside create new day plan ajax");
  let state = store.getState();
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
    // store.dispatch({
    //   type: "CREATE_NEW_DAYPLAN_RESP",
    //   data: resp.data
    // })
  });

}


export function createNewMealPlan(form) {
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
    store.dispatch({
      type: "CREATE_NEW_MEALPLAN_RESP",
      data: resp.data
    })
  });
}

export function getRecipe(form) {
  console.log("Inside get recipe ajax");
  let state = store.getState();
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

// After search response return, function would both dispatch resp to store and // also dipatch to redux to clear previous search parameters.
export function searchRecipes(form) {
  console.log("Inside search ajax");
  let state = store.getState();
  let searchForm = state.forms.search_recipes;

  let searchTerm = searchForm.searchTerm;
  let cuisine = searchForm.cuisine;
  let type = searchForm.type;
  let multiIngre = searchForm.multiIngredient;
  let maxCal = searchForm.maxCal;
  let maxCarb = searchForm.maxCarb;
  let maxProtein = searchForm.maxProtein;
  let maxFat = searchForm.maxFat;
  let url = '/recipes/search/';
  console.log("search form", searchForm)
  if (searchTerm && searchTerm.length > 0)
    url = url + 'query=' + searchTerm;
  else
    return; // TODO: show error message

  if (cuisine)
    url = url + '&cuisine=' + cuisine;
  if (type)
    url = url + '&type=' + type;

  if (multiIngre)
    url = url + '&includeIngredients=' + multiIngre

  if (maxCal > 0)
    url = url + '&maxCalories=' + maxCal

  if (maxFat > 0)
    url = url + '&maxFat=' + maxFat
  if (maxProtein > 0)
    url = url + '&maxProtein=' + maxProtein
  if (maxCarb > 0)
    url = url + '&maxCarbs=' + maxCarb
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


// adding Danie's changes
export function post_login(path, body) {
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

export function post_signup(path, body) {
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

  post_login('/sessions', data)
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


export function submit_signup(form) {
  let state = store.getState();
  let data = state.forms.signup;
  if (data.password != data.password_confirmation) {
    store.dispatch({
      type: 'CHANGE_SIGNUP',
      data: { errors: "Password doesn't match up" },
    });
    return;
  }
  else {
    store.dispatch({
      type: 'CHANGE_SIGNUP',
      data: { errors: "" },
    });
  }

  post_signup('/users', { user: data })
    .then((resp) => {
      console.log("resp", resp);
      if (resp.errors) {
        store.dispatch({
          type: 'CHANGE_SIGNUP',
          data: { errors: resp.errors },
        });
      }
      else {
        console.log("user created");
        if (state.users.size == 0) {
          list_users();
        }
        else {
          store.dispatch({
            type: 'ADD_USERS',
            data: [resp.data],
          });
        }
        form.redirect('/');
      }
    });
}

export function submit_comments(form) {
  let state = store.getState();
  let data = state.forms.new_comments;
  if (!data.comments) {
    store.dispatch({
      type: 'CHANGE_COMMENTS',
      data: { errors: "Comment is blank" },
    });
  }
  else {
    store.dispatch({
      type: 'CHANGE_COMMENTS',
      data: { errors: null },
    });
  }
  console.log("creating a new comment");
  post('/comments', {
    comment: {
      recipe_id: data.recipe_id,
      user_id: data.user_id,
      comments: data.comments,
    }
  }).then((resp) => {
    console.log("response", resp);
    if (resp.data) {
      if (state.comments.size == 0) {
        list_comments();
      }
      else {
        store.dispatch({
          type: 'ADD_COMMENTS',
          data: [resp.data],
        });
      }
      store.dispatch({
        type: 'CHANGE_COMMENTS',
        data: { comments: "" },
      });
      form.clearInputBox();
    }
    else {
      store.dispatch({
        type: 'CHANGE_COMMENTS',
        data: { errors: JSON.stringify(resp.errors) },
      });
    }
  });
}

export function list_users() {
  get('/users')
    .then((resp) => {
      console.log("list_users", resp);
      store.dispatch({
        type: 'ADD_USERS',
        data: resp.data,
      });
    });
}


export function list_comments() {
  console.log("getting all comments");
  get('/comments')
    .then((resp) => {
      console.log("list_comments", resp);
      store.dispatch({
        type: 'ADD_COMMENTS',
        data: resp.data,
      });
    });
}

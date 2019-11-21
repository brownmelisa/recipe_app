import store from './store';

export function post(path, body) {
  let state = store.getState();
  //let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      //'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      //'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
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

export function getRecipe(form)
{
  console.log("Inside get recipe ajax");
  let state = store.getState();
  let recipeId = state.forms.test_get_recipe_details.recipeId;
  console.log("Recipe id: ", recipeId);

  let url = '/recipes/' + recipeId;
  get(url)
    .then((resp) => {
      console.log("Get Recipe Resp", resp);
  });
}

export function searchRecipes(form)
{
  console.log("Inside search ajax");
  let state = store.getState();
  let searchForm = state.forms.search_recipes;

  let searchTerm = searchForm.searchTerm;
  let cuisine = searchForm.cuisine;
  let type = searchForm.type;

  let url = '/recipes/search/';
  if(searchTerm.length > 0)
    url = url + 'query=' + searchTerm;
  else
    return; // TODO: show error message

  if(cuisine.length > 0)
    url = url + '&cuisine=' + cuisine;
  if(type.length > 0)
    url = url + '&type=' + type;
  console.log('url ', url);

  get(url)
    .then((resp) => {
      console.log("Search Resp", resp);
  });
}

import store from './store';
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
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}


export function submit_signup(form) {
  let state = store.getState();
  let data = state.forms.signup;
  if (data.password != data.password_confirmation){
    store.dispatch({
      type: 'CHANGE_SIGNUP',
      data: {errors: "Password doesn't match up"},
    }); 
    return;
  }
  else{
    store.dispatch({
      type: 'CHANGE_SIGNUP',
      data: {errors: ""},
    }); 
  }

  post_signup('/users', {user: data})
    .then((resp) => {
      console.log("resp",resp);
      if (resp.errors) {
        store.dispatch({
          type: 'CHANGE_SIGNUP',
          data: {errors: resp.errors},
        });
      }
      else {
        console.log("user created")
        form.redirect('/');
      }
    });

	
}




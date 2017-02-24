import { install, combineReducers } from 'redux-loop';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import smileyReducer from './reducer';
import AuthService from './authservice';

const reducer = combineReducers({
  smileyReducer,
});
const store = createStore(
  reducer,
  compose(
    applyMiddleware(),
    install()
  )
);


axios.interceptors.request.use( config => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
  return config
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    AuthService.logout();
  }

});


export default store;



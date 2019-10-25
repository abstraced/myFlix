// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES,SET_USERINFOS } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userInfos (state={},action){
  switch (action.type) {
    case SET_USERINFOS:
        return action.value;
        default:
            return state;
  }
}



const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userInfos
});

export default moviesApp;
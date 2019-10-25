
// src/actions/actions.js

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERINFOS = 'SET_USERINFOS';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserInfos(value) {
  return { type: SET_USERINFOS, value}

}
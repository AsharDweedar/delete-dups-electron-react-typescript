import * as types from './actionTypes';

export function receiveExt(json) {
  return {type: types.RECEIVE_STUFF, ext: json.ext};
}

export function fetchStuff() {
  return dispatch => {
      json = {ext: [".png"]}
    return dispatch(receiveExt(json))
  };
}

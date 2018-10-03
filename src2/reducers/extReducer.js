import initialState from './initialState'
import { FETCH_EXT, RECEIVE_EXT } from '../actions/actionTypes'

export default function ext (state = initialState.ext, action) {
  let newState
  switch (action.type) {
    case FETCH_EXT:
      console.log('FETCH_EXT Action')
      return action
    case RECEIVE_EXT:
      newState = action.stuff
      console.log('RECEIVE_EXT Action')
      return newState
    default:
      return state
  }
}

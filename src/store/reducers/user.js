import {GOT_USER} from '../actions'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer

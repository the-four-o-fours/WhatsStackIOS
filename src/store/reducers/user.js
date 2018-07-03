import {GOT_USER} from '../actions'

const initialState = {img: 'default'}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return {...state, ...action.user}
    default:
      return state
  }
}

export default userReducer

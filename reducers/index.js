import { ADD_DECK, RECEIVE_DECKS, GET_DECK, ADD_CARD_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.payload.decks
      }   
    case ADD_DECK :
    case GET_DECK :
      return {
        ...state,
        [action.payload.title]: {title: action.payload.title, questions: []},
      }
    
    case ADD_CARD_DECK :
      return {
        ...action.payload.decks
      }
    default :
      return state
  }
}

export default entries 
import { ADD_DECK, RECEIVE_DECKS, GET_DECK, ADD_CARD_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }   
    case ADD_DECK :
    case GET_DECK :
      return {
        ...state,
        [action.title]: {title: action.title, questions: []},
      }
    
    case ADD_CARD_DECK :
      return {
        ...action.decks
      }
    default :
      return state
  }
}

export default entries 
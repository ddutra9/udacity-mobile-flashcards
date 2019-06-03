export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'
export const ADD_CARD_DECK = 'ADD_CARD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title,
    }
} 

export function addCardToDeck (decks) {
  return {
      type: ADD_CARD_DECK,
      decks,
  }
} 

export function getDeck (deck) {
  return {
      type: GET_DECK,
      deck,
  }
} 

export function receiveDecks (decks) {
    return {
      type: RECEIVE_DECKS,
      decks,
    }
  }
  
export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'
export const ADD_CARD_DECK = 'ADD_CARD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
} 

export function addCardToDeck (deck) {
  return {
      type: ADD_CARD_DECK,
      deck,
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
  
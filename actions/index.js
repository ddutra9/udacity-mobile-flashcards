export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'
export const ADD_CARD_DECK = 'ADD_CARD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export const addDeck = title => ({
  type: ADD_DECK,
  payload: { title },
  error: false,
})

export const addCardToDeck = decks => ({
  type: ADD_CARD_DECK,
  payload: {decks},
  error: false,
})

export const getDeck = deck => ({
  type: GET_DECK,
  payload: {deck},
  error: false,
})

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  payload: {decks},
  error: false,
})
import { AsyncStorage } from 'react-native'

export const FLASH_CARD_STORAGE_KEY = 'UdaciFitness:flashCard'

export function fetchDecksResults () {
  return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
}

export function saveDeckTitle (title) {  
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
        title: title, questions: []
    }))
}

export function addCardToDeck (title, card) {  
  return fetchDecksResults().then((decks) => {
    let deck = decks.filter((deck) => {
      return deck.title === title
    })

    deck.questions.push(card)
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({deck}))
  })
}

export function getDeck (title) {  
  return fetchDecksResults().then((decks) => {
    return decks.filter((deck) => {
      return deck.title === title;
    })
  })
}
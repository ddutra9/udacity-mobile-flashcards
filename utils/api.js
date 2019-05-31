import { AsyncStorage } from 'react-native'

export const FLASH_CARD_STORAGE_KEY = 'UdaciFitness:flashCard'

export function fetchDecksResults () {
  // AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY)
  return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function saveDeckTitle (title) {  
    const deck = {title: title, questions: []}
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({[title]: deck}))
}

export function addCardToDeck (title, card) {  
  return fetchDecksResults().then((decks) => {
    decks[title].questions.push(card)
    return AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({decks}))
  })
}

export function getDeck (title) {  
  return fetchDecksResults().then((decks) => {
    return decks[title]
  })
}
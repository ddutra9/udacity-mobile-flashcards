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
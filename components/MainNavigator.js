import { Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, 
  createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Decks from './Decks'
import AddDeck from './AddDeck'
import Cards from './Cards'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { purple, white } from '../utils/colors'

const router = {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === 'ios' && <Ionicons name="ios-bookmarks" size={30} color={tintColor} />,
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === 'ios' && <FontAwesome name="plus-square" size={30} color={tintColor} />,
      },
    }
  };
  
  const navigationOptions = {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        padding: 10,
        height: Platform.OS === 'ios' ? 60 : 'auto',
        fontSize: 18,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  };
  
    const TabNav =
        Platform.OS === 'ios'
        ? createBottomTabNavigator(router, navigationOptions)
        : createMaterialTopTabNavigator(router, navigationOptions)
  
    const MainNavigator = createAppContainer(createStackNavigator({
        home: {
            screen: TabNav,
            navigationOptions: {
                header: null,
            },
        },
        addCard: {
            screen: AddCard,
            navigationOptions: {
                title: 'Add Card',
                headerTintColor: Platform.OS === 'ios' ? purple : white,
                headerStyle: {
                    backgroundColor: Platform.OS === 'ios' ? white : purple,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
        quiz: {
          screen: Quiz,
          navigationOptions: {
              title: 'Quiz',
              headerTintColor: Platform.OS === 'ios' ? purple : white,
              headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? white : purple,
              },
              headerTitleStyle: {
              fontWeight: 'bold',
              },
          }
        },
        cards: {
          screen: Cards,
          navigationOptions: {
              title: 'Cards',
              headerTintColor: Platform.OS === 'ios' ? purple : white,
              headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? white : purple,
              },
              headerTitleStyle: {
              fontWeight: 'bold',
              },
          }
        }
  }));

  export default MainNavigator
import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator, createAppContainer, 
  createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { purple, white } from './utils/colors'
import reducer from './reducers'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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
  }
}));

export default class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

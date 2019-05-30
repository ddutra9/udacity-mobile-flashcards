import React, { Component } from 'react'
import { connect } from "react-redux"
import { AppLoading} from 'expo'
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {fetchDecksResults} from '../utils/api'
import { receiveDecks } from "../actions"

class Decks extends Component {

    state = {
        ready: false,
    }

    componentDidMount () {
        const { dispatch } = this.props
        console.log('monta')

        fetchDecksResults()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }

    onDeckCardPress(deck) {
       //TODO: go to page
    }

    render() {
        const {decks} = this.props
        const {ready} = this.state
        
        // Object.keys(decks).map((key) => console.log(key))

        if(ready === false) {
            return (
                <AppLoading />
            )
        }

        return (
            <ScrollView style={{flex: 1}}>
                {Object.keys(decks).map((key) => 
                    <View key={key}>
                        <TouchableOpacity onPress={() => this.onDeckCardPress(key)}>
                            <Text>{decks[key].title}</Text>
                            <Text>{decks[key].questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks);
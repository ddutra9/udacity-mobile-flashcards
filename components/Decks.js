import React, { Component } from 'react'
import { connect } from "react-redux"
import { AppLoading} from 'expo'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {fetchDecksResults} from '../utils/api'
import { receiveDecks } from "../actions"

class Decks extends Component {

    state = {
        ready: false,
    }

    componentDidMount () {
        const { dispatch } = this.props

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
        if(!ready) {
            return (
                <AppLoading />
            )
        }

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={decks}
                    renderItem={({item}) => {
                        <TouchableOpacity key={item.title} onPress={() => this.onDeckCardPress(item)}>
                            <Text>{item.title}</Text>
                            <Text>{item.questions.length} cards</Text>
                        </TouchableOpacity>
                    }}
                    />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(Decks);
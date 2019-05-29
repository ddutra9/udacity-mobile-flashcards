import React, { Component } from 'react'
import { connect } from "react-redux"
import { AppLoading} from 'expo'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class Decks extends Component {

    state = {
        ready: false,
    }

    componentDidMount () {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                        dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                        }))
                    }
                })
            .then(() => this.setState(() => ({ready: true})))
    }

    onDeckCardPress(deck) {
       //TODO: go to page
    }

    render() {
        const { decks } = this.props;

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={decks}
                    renderItem={({item}) => {
                        <TouchableOpacity key={item.title} onPress={() => this.onDeckCardPress(itme)}>
                            <Text>{item.title}</Text>
                            <Text>{item.questions.length} cards</Text>
                        </TouchableOpacity>
                    }}
                    />
            </View>
        )
    }
}

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks);
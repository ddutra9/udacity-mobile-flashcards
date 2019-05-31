import React, { Component } from 'react'
import { connect } from "react-redux"
import { AppLoading} from 'expo'
import { Ionicons } from '@expo/vector-icons';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {fetchDecksResults} from '../utils/api'
import { receiveDecks } from "../actions"
import {black, gray} from '../utils/colors'

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
        
        // Object.keys(decks).map((key) => console.log(key))

        if(ready === false) {
            return (
                <AppLoading />
            )
        }

        if(!decks) {
            return (
                <View style={{flex: 1}}>
                    <Text>Please add Decks on App!</Text>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map((key) => 
                    <TouchableOpacity style={styles.row} key={key}
                        onPress={() => this.onDeckCardPress(key)}>
                        <View style={styles.rowContainerLeft}>
                            <Text style={styles.rowQuestions}>{decks[key].questions.length} cards</Text>
                            <Text style={styles.rowTitle}>{decks[key].title}</Text>
                        </View>
                        <Ionicons color={black} size={20}  name='cards-outline' />
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        marginTop: 14,
        alignSelf: "stretch",
      },
      row: {
        elevation: 1,
        borderRadius: 2,
        backgroundColor: colors.tertiary,
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 16,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 0,
        marginBottom: 6,
      },
      rowContainerLeft: {
        flex: 1,
        flexDirection: 'column',
      },
      rowQuestions: {
        color: gray,
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        fontSize: 6
      },
      rowTitle: {
        color: black,
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        fontSize: 14
      },
    });

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks);
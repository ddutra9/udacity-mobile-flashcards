import React, { Component } from 'react'
import { connect } from "react-redux"
import { AppLoading} from 'expo'
import { Ionicons } from '@expo/vector-icons';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {fetchDecksResults} from '../utils/api'
import { receiveDecks } from "../actions"
import {black, lightGray, purple} from '../utils/colors'

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

    onDeckCardPress(key) {
        this.props.navigation.navigate(
            'quiz',
            { title: key }
        )
    }

    render() {
        const {decks} = this.props
        const {ready} = this.state

        if(ready === false) {
            return (
                <AppLoading />
            )
        }

        if(!decks || Object.values(decks).length == 0) {
            return (
                <View style={styles.containerNoDecks}>
                    <Text style={{alignSelf:"center"}}>Please add Decks on App!</Text>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map((key) => 
                    <TouchableOpacity style={styles.row} key={key}
                        onPress={() => this.onDeckCardPress(key)}>
                        <View style={styles.rowContainerLeft}>
                            <Text style={styles.rowQuestions}>{decks[key].questions ? decks[key].questions.length : 0} cards</Text>
                            <Text style={styles.rowTitle}>{decks[key].title}</Text>
                        </View>
                        <Ionicons color={purple} size={20}  name='md-chatbubbles' />
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
      containerNoDecks: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: {
        elevation: 1,
        borderRadius: 2,
        backgroundColor: lightGray,
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
        color: black,
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        fontSize: 12
      },
      rowTitle: {
        color: black,
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        fontSize: 20
      },
    });

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks);
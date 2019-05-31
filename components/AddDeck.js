import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { connect } from "react-redux"

import { addDeck } from "../actions"
import {saveDeckTitle} from '../utils/api'
import FloatingLabelInput from './FloatingLabelInput'
import { purple, white, black } from '../utils/colors'

class AddDeck extends React.Component {

    state = {
        title: undefined
    }

    onAddCreateDeckPress = () => {
        const {title} = this.state

        if(!title) {
            return alert("Please Enter Deck title")
        }

        saveDeckTitle(title).then(() => {
            this.props.dispatch(addDeck(title))
        }).then(() => {
            this.props.navigation.navigate("addCard", {
                title : this.state.title
            })

            this.setState({ title: undefined })
        })
    }

    handleChange = value => {
        this.setState({ title: value })
    }

    render() {
        return (            
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={styles.header}>What is the title of your new deck?</Text>
                    <View style={{alignSelf:"stretch"}}>
                        <FloatingLabelInput  label="Deck Title"
                            value={this.state.title}
                            onChangeText={this.handleChange} />
                    </View>
                    
                    <View style={{flex:1, flexDirection:"row",  alignSelf:"stretch", justifyContent:"center"}} full>
                        <TouchableOpacity style={[styles.btn]} onPress={this.onAddCreateDeckPress}>
                            <Text style={styles.text}>Create Deck</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>            
        )
    }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
    selfAlign : {
        alignSelf:"center"
    },
    header : {
        fontWeight:"bold",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,
        color: black,
    },
    text : {
        fontWeight:"bold",
        fontSize: 20,
        color: white,
    },  
    btn : {
        alignSelf: "center",
        backgroundColor: purple,
        borderRadius: 25,
        padding: 30,
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
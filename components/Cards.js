import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { connect } from "react-redux"

import { purple, white, black } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class Cards extends React.Component {

    onNavegateTo(key) {
        if(key === 'quiz'){
            clearLocalNotification().then(setLocalNotification)
        }

        this.props.navigation.navigate(
            key,
            { title: this.props.deck.title }
        )
    }

    render() {
        const {deck} = this.props
        
        return (            
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={styles.header}>{deck.title}</Text>
                    <Text style={[styles.header, {marginBottom: 100}]}>{deck.questions.length} cards</Text>
                    <TouchableOpacity style={[styles.btn]} onPress={()=> this.onNavegateTo('addCard')}>
                        <Text style={styles.text}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn]} onPress={()=> this.onNavegateTo('quiz')}>
                        <Text style={styles.text}>Start Quiz</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>            
        )
    }
}

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        deck : state[title]
    }
}

export default connect(mapStateToProps)(Cards);

const styles = StyleSheet.create({
    selfAlign : {
        alignSelf:"center"
    },
    header : {
        fontWeight:"bold",
        marginTop: 30,
        fontSize: 20,
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
        padding: 20,
        marginBottom: 20,
    },
    container: {
        flex:1,
        alignItems: 'center',
    },
});
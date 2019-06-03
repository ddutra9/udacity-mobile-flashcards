import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';
import { connect } from "react-redux";

import { addCardToDeck  } from "../actions";
import { saveCardToDeck } from '../utils/api'
import { purple, white } from '../utils/colors'
import FloatingLabelInput from './FloatingLabelInput'

class AddCard extends React.Component {
    
    onAddCardPress() {
        const { title } = this.props;
        const { question, answer } = this.state;

        if(!question || !answer) {
            return alert("Campos requeridos!")
        }

        saveCardToDeck(title, {
            question,
            answer
        })
        .then((decks) =>  this.props.dispatch(addCardToDeck(decks)))
        .then(() => {
            this.setState({question: undefined, answer: undefined})
        })
    }

    state = {
        question: undefined,
        answer: undefined
    }

    handleChange = name => value => {
        this.setState({ [name]: value })
    }
    
    render() {
        
        return (
            <View style={styles.container}>     
                <KeyboardAvoidingView behavior="padding">
                    <View style={{marginBottom: 20, alignSelf:"stretch"}}>
                        <FloatingLabelInput label="Question"
                            value={this.state.question}
                            onChangeText={this.handleChange('question')} />
                        
                        <FloatingLabelInput label="Answer"
                            value={this.state.answer}
                            onChangeText={this.handleChange('answer')} />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=> this.onAddCardPress() } block >
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps (state, { navigation }) {
    const { title } = navigation.state.params

    return {
        title,
    }
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center'
    },
    text: {
        fontWeight:"bold",
        fontSize: 20,
        color: white,
    },  
    btn: {
        backgroundColor: purple,
        borderRadius: 25,
        padding: 20,
    },
})
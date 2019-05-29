import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { connect } from "react-redux";

import { addCardToDeck  } from "../actions";
import API from '../utils/api'
import { purple } from '../utils/colors'
import FloatingLabelInput from './FloatingLabelInput'

class AddCard extends React.Component {
    
    onAddCardPress() {
        const { title } = this.props;
        const { question, answer } = this.state;

        if(!question || !answer) {
            return alert("Campos requeridos!")
        }

        API.addCardToDeck(title, {
            question,
            answer
        }).then((deck) =>  this.props.dispatch(addCardToDeck(deck)))
        .then(() => {
            this.setState({ 
                question: null,
                answer: null 
            })
        })
    }

    state = {
        question: null,
        answer: null
    }

    handleChange = name => value => {
        this.setState({ [name]: value })
    }
    
    render() {
        
        return (
            <View style={styles.container}>     
                <View style={{alignSelf:"stretch"}}>
                    <FloatingLabelInput  label="Question"
                        onChange={this.handleChange('question')} />
                    
                    <FloatingLabelInput label="Answer"
                        onChange={this.handleChange('answer')} />
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=> this.onAddCardPress() } block >
                    <Text>Submit</Text>
                </TouchableOpacity>
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
    btn: {
        margin: 30,
        backgroundColor: purple
    },
})
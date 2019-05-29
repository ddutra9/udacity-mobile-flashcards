import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { connect } from "react-redux";
import { handleAddCardToDeck  } from "../actions/decks";
import { purple } from '../utils/colors'
import FloatingLabelInput from './FloatingLabelInput'

class AddCard extends React.Component {
    
    onAddCardPress() {
        const { title } = this.props;
        const { question, answer } = this.state;

        if(!question || !answer) {
            return alert("Campos requeridos!")
        }

        this.props.onAddCardToDeck(title, {
            question,
            answer
        });
    }

    state = {
        question: null,
        answer: null
    };

    handleChange = name => value => {
        this.setState({ [name]: value });
    };
    
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

function mapDispatchToProps(dispatch) {
    return {
        onAddCardToDeck: (title, card) => { dispatch(handleAddCardToDeck(title, card)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

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
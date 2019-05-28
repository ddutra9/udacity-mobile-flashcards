import React from 'react';
import { StyleSheet} from 'react-native';
import { Container, Button, Text, Item, Input, Form } from 'native-base';
import { connect } from "react-redux";
import { handleAddCardToDeck  } from "../actions/decks";
import { purple } from '../utils/colors'
import FloatingLabelInput from './FloatingLabelInput'

class AddCard extends React.Component {
    
    onAddCardPress() {
        const { title } = this.props.navigation.state.params;
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
            <Container style={styles.container}>     
                
                    <Form style={{alignSelf:"stretch"}}>
                        <FloatingLabelInput  label="Email"
                            value={this.state.value}
                            onChange={this.handleChange('question')} />

                        <Item style={styles.cardInputField} rounded>
                            <Input placeholder='Answer' 
                                onChangeText={this.handleChange('answer')}/>
                        </Item>
                    </Form>
                    <Button style={styles.btn} onPress={()=> this.onAddCardPress() } block >
                        <Text>Submit</Text>
                    </Button>
                
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddCardToDeck: (title, card) => { dispatch(handleAddCardToDeck(title, card)) }
    };
}

export default connect(null, mapDispatchToProps)(AddCard);

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
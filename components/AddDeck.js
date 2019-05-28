import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { Container, Button, Text, Item, Input, Form } from 'native-base'
import { connect } from "react-redux"
import { handleSaveDeckTitle } from "../actions/decks"
import { purple, white } from '../utils/colors'

class AddDeck extends React.Component {

    state = {
        title: null
    }

    onAddCreateDeckPress() {
        const {title} = this.state

        if(!title) {
            return alert("Please Enter Deck title")
        }

        this.props.saveDeckTitle(title).then(() => {
            this.props.navigation.navigate("Deck", {
                title : this.state.title
            })

            this.setState({ title: null })
        })  
    }

    handleChange = value => {
        this.setState({ 'title': value })
    }

    render() {
        return (            
                <Container style={styles.container}>
                    <KeyboardAvoidingView behavior="padding">
                        <Text style={[styles.selfAlign,styles.text1]}>What is the title of your new deck?</Text>
                        <Form style={{alignSelf:"stretch"}}>
                            <Item style={{backgroundColor:"white"}} rounded>
                                <Input  placeholder='Deck Title' 
                                    value={this.state.title}
                                    onChangeText={this.handleChange} />
                            </Item>
                        </Form>
                        
                        <View style={{flex:1, flexDirection:"row",  alignSelf:"stretch", justifyContent:"center"}} full>
                            <Button style={[styles.btn]} onPress={this.onAddCreateDeckPress}>
                                <Text>
                                    Create Deck
                                </Text>
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </Container>            
        )
    }
}

function mapStateToProps({newDeckId}) {
    return {
        newDeckId : newDeckId.newDeckId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveDeckTitle: (title) => dispatch(handleSaveDeckTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);

const styles = StyleSheet.create({
    selfAlign : {
        alignSelf:"center"
    },
    text1 : {
        fontWeight:"bold",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,
        color: white,
    },  
    btn : {
        alignSelf: "center",
        backgroundColor: purple
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
import React, { PureComponent } from 'react';
import { StyleSheet, Animated, View, Text, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import { purple, white, red, black } from "../utils/colors";

class Quiz extends PureComponent {
    
    constructor(props) {
        super(props)

        this.state = {
            questionIndex: 0,
            correctAnswer: 0,
            quizCompleted: false,
            flipText: "Show Answer",
        }
    }

    componentWillMount(){
        this.animatedValue = new Animated.Value(0)
        this.value = 0

        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()

            this.setState({flipText:"Show Answer"});
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()

            this.setState({flipText:"Show Question"})
        }
    }

    markQuestion(isCorrect){
        this.setState((state, props)=> {
            const updatedIndex = state.questionIndex + 1;
            return {
                correctAnswer: isCorrect ? state.correctAnswer + 1 : state.correctAnswer,
                questionIndex: updatedIndex,
                quizCompleted: props.deck.questions.length === updatedIndex
            }
        })

        this.value = 180;
        this.flipCard();
    }

    restartQuiz() {
        this.props.navigation.goBack()
    }

    render() {
        const { questions } = this.props.deck;
        if (this.state.quizCompleted) {
            return this.renderQuizComplete();
        }
        else if(questions && questions.length){
            return this.renderQuiz(questions);
        }
        else {
            return this.renderNoFoundCards();
        }
        
    }

    renderQuiz(questions){
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        const { questionIndex } = this.state
        return (
            <View style={styles.container}>                
                <View style={{marginBottom: 20}}>
                    <Text style={styles.questionCounterText}>{questionIndex+1}/{questions.length}</Text>
                </View>
                <View style={{flex: 2}}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <Text style={styles.flipText}>{questions[questionIndex].question}</Text>    
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <Text style={styles.flipText}>{questions[questionIndex].answer}</Text>  
                    </Animated.View>
                </View>
                <View >
                    <TouchableOpacity style={styles.btn} onPress={()=> this.flipCard() } >
                        <Text style={styles.text}>{this.state.flipText}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBtns}>
                    <TouchableOpacity style={[styles.btn, {marginRight:10}]} onPress={()=> this.markQuestion(true) } >
                        <Text style={styles.text}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: red}]} onPress={()=> this.markQuestion(false) } >
                        <Text style={styles.text}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

    renderNoFoundCards(){
        return (
            <View style={styles.container}>                
                <View >
                    <Text style={styles.header}>
                        No cards found in this deck!
                    </Text>
                </View>
            </View>
        )
    }

    renderQuizComplete(){
        const {correctAnswer} = this.state
        const {deck} = this.props

        return (
            <View style={styles.container}> 
                <Text style={styles.header}>Quiz Completed</Text>
                <Text style={styles.header}>
                    You have answered { Math.round((correctAnswer/deck.questions.length)*100)}% correct
                </Text>
                <TouchableOpacity style={styles.btn} onPress={()=> this.restartQuiz() } block >
                    <Text style={styles.text}>Restart Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        deck : state[title]
    }
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerBtns: {
        flexDirection: 'row', 
        marginBottom: 40
    },
    flipCard: {
        width: 250,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: purple,
        backfaceVisibility: 'hidden',
        borderRadius:30,
    },
    flipCardBack: {
        position: "absolute",
        top: 0,
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: white,
        fontWeight: 'bold',
    },
    questionCounterText: {
        fontSize: 20,
        marginLeft:20
    },
    text: {
        fontSize:20, 
        color: white
    },
    btn: {
        backgroundColor: purple,
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
    },
    header : {
        fontWeight:"bold",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 30,
        color: black,
    },
})
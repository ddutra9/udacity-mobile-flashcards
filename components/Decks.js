import React, {FlatList, StyleSheet} from 'react-native';
import {Container, Content, Card, CardItem, Text} from 'native-base';

class Decks extends React.Component {

    state = {
        decks: null,
    };

    onDeckCardPress(deck) {
       //TODO: go to page
    }

    render() {
        const { decks } = this.props;

        return (
            <Container style={{flex: 1}}>
                <Content>
                    <FlatList
                        data={decks}
                        renderItem={({item}) => {
                            <TouchableOpacity key={item.id} onPress={() => this.onDeckCardPress(itme)}>
                                <Card bordered >
                                    <CardItem header style={{justifyContent:"center",backgroundColor:colors.homeCardBackgroundColor}} >
                                            <Text>{item.title}</Text>
                                    </CardItem>
                                    <CardItem style={{backgroundColor:colors.homeCardBackgroundColor}}>
                                        <Body style={{alignItems:"center"}}>
                                            <Text>
                                                {item.questions.length} cards
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        }}
                        />
                </Content>
            </Container>
        )
    }
}

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks);
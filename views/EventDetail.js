import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class EventDetail extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>View details of one particular event</Text>
            </View>
        );
    }
}

EventDetail.navigationOptions = {
    title: 'EventDetail'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

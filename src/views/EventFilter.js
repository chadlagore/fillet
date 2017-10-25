import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class EventFilter extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>Filter events by location, price, etc.</Text>
            </View>
        );
    }
}

EventFilter.navigationOptions = {
    title: 'Filter'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

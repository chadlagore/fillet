import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class EventList extends Component {
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>List of events</Text>
                <Button onPress={() => navigate('EventFilter')} title="Event Filter" />
                <Button onPress={() => navigate('EventDetail')} title="Event Detail" />
            </View>
        );
    }
}

EventList.navigationOptions = {
    title: 'EventList'
};

EventList.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

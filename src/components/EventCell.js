import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Event from './../models/event'
import PropTypes from 'prop-types';


/* A cell to represent an event in the EventList */
export default class EventCell extends Component {

    /* Constructor initializes event name (prop) and distance
     * from user (state).
     */
    constructor (props) {
        super(props);
        this.state = {};
    }

    /* Render a horizontal event box. */
    render () {
        const { event, onPress } = this.props
        const { title } = event;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.time}>
                    {event.start.format('dddd, MMMM D [at] h:mmA')}
                </Text>
            </TouchableOpacity>
        );
    }
}

EventCell.propTypes = {
    event: Event,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 16,
        color: '#2a2a2a'
    },
    time: {
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 14,
        color: '#2a2a2a'
    }
});

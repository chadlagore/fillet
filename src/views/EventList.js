import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import EventCell from './../components/EventCell';
import { connect } from 'react-redux';
import { addEvents, clearEvents } from './../actions/events';
import { getEvents } from './../api';
import mockEvent from './../mocks/event';

class EventList extends Component {
    constructor (props) {
        super(props);
        getEvents({ ...props.location }).then(
            res => props.addEvents(res),
            () => props.addEvents([mockEvent])
        );
    }

    render () {
        const { events, navigation } = this.props;
        const { navigate } = navigation;

        if (events.length) {
            return (
                <ScrollView style={styles.container}>
                    {
                        events.map(event => (
                            <EventCell
                                event={event}
                                key={event.title}
                                onPress={() => navigate('EventDetail', { event })} />
                        ))
                    }
                </ScrollView>
            );
        } else {
            return (
                <View style={[styles.container, styles.spinner]}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }
}

/* eslint-disable react/prop-types */
const filterButton = navigate => (
    <Button
        onPress={() => navigate('EventFilter')}
        title="Filter" />
);

EventList.navigationOptions = ({ navigation }) => ({
    title: 'Event List',
    headerRight: filterButton(navigation.navigate)
});

EventList.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    }),
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired
    }),
    events: PropTypes.array,
    addEvents: PropTypes.func,
    clearEvents: PropTypes.func
}

// NOTE: this is just for verifying redux is working happily
const mapDispatchToProps = dispatch => ({
    addEvents: events => dispatch(addEvents(events)),
    clearEvents: () => dispatch(clearEvents())
});

// Pull events from redux into props so we can display it
const mapStateToProps = state => ({
    events: state.events.events,
    location: state.user.location
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

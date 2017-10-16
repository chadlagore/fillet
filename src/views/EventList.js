import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';
import EventCell from './../components/EventCell';
import { connect } from 'react-redux';
import { addEvents, clearEvents } from './../actions/events';
import { getEvents } from './../api';

class EventList extends Component {
    constructor (props) {
        super(props);
        getEvents().then(res => {
            return res.json().then(json => props.addEvents(json.results))
        });
    }
    render () {
        const { navigate } = this.props.navigation;
        const { events } = this.props;

        return (
            <View style={styles.container}>
                <Text>List of events</Text>
                <Button onPress={() => navigate('EventFilter')} title="Event Filter" />
                {this._renderEvents(events)}
            </View>
        );
    }

    _renderEvents (events) {
        return (
            <ScrollView style={styles.eventsContainer}>
                {events.map(ev => <EventCell event={ev} key={ev.title} />)}
            </ScrollView>
        )
    }
}

EventList.navigationOptions = {
    title: 'EventList'
};

EventList.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
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
    events: state.events.events
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    eventsContainer: {
        flex: 1,
        flexDirection: 'column'
    }
});

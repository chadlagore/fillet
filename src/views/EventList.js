import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { addEvents, clearEvents } from './../actions/events';
import EventCell from './../components/EventCell'

class EventList extends Component {
    render () {
        const { navigate } = this.props.navigation;
        const { events, addEvents, clearEvents } = this.props;

        return (
            <View style={styles.container}>
                <Text>List of events</Text>
                <FlatList
                    data={[
                        { name: 'Event1' },
                        { name: 'Event2' },
                        { name: 'Event3' },
                        { name: 'Event4' },
                        { name: 'Event5' }
                    ]}
                    renderItem={({ item }) => <EventCell name={item.name} />}
                    keyExtractor={(item, index) => index}
                    />
                <Button onPress={() => navigate('EventFilter')} title="Event Filter" />
                <Button onPress={() => navigate('EventDetail')} title="Event Detail" />
                <Button onPress={() => addEvents()} title="Add events" />
                <Button onPress={() => clearEvents()} title="Clear events" />
                {this._renderEvents(events)}
            </View>
        );
    }

    _renderEvents (events) {
        return (
            <View style={styles.eventsContainer}>
                {events.map((ev, i) => <Text key={i}>{ev}</Text>)}
            </View>
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
    addEvents: () => dispatch(addEvents(['a', 'b', 'c'])),
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

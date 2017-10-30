import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { addEvents, clearEvents } from './../actions/events';
import { getEvents } from './../api';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';


class EventFilter extends Component {
    state = {
        isDateTimePickerVisible: false,
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        getEvents(
            // Set start/end window because backend requires both.
            { ...this.props.location,
                start_time: Moment(date).format('YYYY-MM-DD'),
                end_time: Moment(date).add(1, 'days').format('YYYY-MM-DD') }
            ).then(
                res => this.props.addEvents(res),
                err => console.log(err) || this.props.addEvents([mockEvent])
        );
        console.log('A date has been picked: ', Moment(date));
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this._showDateTimePicker} title="Set date" />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }

}

EventFilter.navigationOptions = {
    title: 'Filter'
};


const mapDispatchToProps = dispatch => ({
    addEvents: events => dispatch(addEvents(events)),
    clearEvents: () => dispatch(clearEvents())
});


// Pull new events from redux into props.
const mapStateToProps = state => ({
    events: state.events.events
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

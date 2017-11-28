import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Picker,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { addEvents, clearEvents } from './../actions/events';
import { addCategories } from './../actions/categories';
import { getEvents, getCategories } from './../api';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';


export class EventFilter extends Component {
    constructor (props) {
        super(props);
        getCategories().then(res => props.addCategories(res));
        console.log(this.props.categories)
    }

    state = {
        isDateTimePickerVisible: false
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

    _handleCategoryPicked = (category) => {
        getEvents({ ...this.props.location, category}).then(
                res => this.props.addEvents(res),
                err => console.log(err) || this.props.addEvents([mockEvent]),
                Alert.alert(
                    'Chosen Category',
                    category,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
        );
        this.setState({ selected: category })
        console.log('A category has been picked: ', category);
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this._showDateTimePicker}
                    style={styles.viewDates}
                    activeOpacity={0.6}>
                    <Text style={styles.text}>Set Date</Text>
                </TouchableOpacity>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.selected}
                    onValueChange={(category)=>{this._handleCategoryPicked(category)}}>
                    {(this.props.categories || []).map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index}/>)
                    })}
                </Picker>
                <Text style={styles.text}>Choose an event category</Text>
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
    addCategories: categories => dispatch(addCategories(categories)),
    clearEvents: () => dispatch(clearEvents())
});


// Pull new events from redux into props.
const mapStateToProps = state => ({
    events: state.events.events,
    categories: state.categories.categories
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 25,
        textAlign: 'center',
        color: '#2a2a2a'
    },
    viewDates: {
        borderRadius: 4,
        borderWidth: 1,
        padding: 16,
        borderColor: 'transparent'
    }
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import MapView from 'react-native-maps';

export default class EventDetail extends Component {
    render () {
        const { event } = this.props.navigation.state.params;
        const { title, start, end, location } = event;
        console.log(start.format('dddd, MMMM D at h:mmA'));
        console.log(MapView);

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.venue}>
                    No venue information yet :(
                </Text>
                <Text style={styles.time}>
                    {start.format('dddd, MMMM D [at] h:mmA')}
                </Text>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} />
                <Text style={styles.description}>
                    No description for now... Sorry!
                </Text>
                <Button
                    onPress={this.handleRSVP}
                    title="RSVP" />
            </View>
        );
    }

    handleRSVP () {
        /* eslint-disable no-console */
        console.log('Pressed RSVP');
    }
}

EventDetail.propTypes = {
    navigation: PropTypes.object,
}

EventDetail.navigationOptions = {
    title: 'Event Detail'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        backgroundColor: '#fff'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 6
    },
    locationText: {
        fontWeight: '500',
        color: 'grey',
        paddingBottom: 4
    },
    locationMapView: {
        backgroundColor: '#000',
        height: '30%',
        paddingBottom: 4
    }
});

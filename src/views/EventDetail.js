import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import MapView from 'react-native-maps';
import Event from './../models/event';

export default class EventDetail extends Component {
    render () {
        const { event } = this.props.navigation.state.params;
        const { title, description, venue, start, location } = event;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.venue}>
                        Where: {venue}
                    </Text>
                    <Text style={styles.time}>
                        When: {start.format('dddd, MMMM D [at] h:mmA')}
                    </Text>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.1
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: location.lat,
                            longitude: location.lon
                        }}
                        title={title}
                        description={description} />
                </MapView>
                <View style={styles.bottom}>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                    <Button
                        onPress={this.handleRSVP}
                        title="RSVP" />
                </View>
            </View>
        );
    }

    handleRSVP () {
        /* eslint-disable no-console */
        console.log('Pressed RSVP');
    }
}

EventDetail.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                event: Event
            })
        })
    })
}

EventDetail.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.event.title
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 8
    },
    top: {
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    venue: {
        fontSize: 22
    },
    time: {
        fontSize: 16,
        color: '#999'
    },
    map: {
        flex: 1
    }
});

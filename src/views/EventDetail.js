import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class EventDetail extends Component {
    render () {
        const { event } = this.props.navigation.state.params;
        const { title } = event;
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {title ? title : 'Inceptos Malesuada Tortor Condimentum Sollicitudin'}
                </Text>
                <Text style={styles.locationText}>
                    {'The Commodore Ballroom'}
                </Text>
                <View style={styles.locationMapView}>
                    <Text style={{color: 'white'}}>
                        Event location map goes here
                    </Text>
                </View>
                <Text>
                    {'Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo.\n\nVestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'}
                </Text>
                <Button
                    onPress={this.props.onRsvpPress ? this.onRsvpPress : () => {}}
                    title="RSVP to this Event" />
            </View>
        );
    }
}

EventDetail.navigationOptions = {
    title: 'Event Detail'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        justifyContent: 'flex-start',
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

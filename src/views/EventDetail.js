import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Modal,
    Button,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import store from './../store';
import { rsvp, unrsvp } from './../actions/rsvp';
import { showModal, hideModal } from './../actions/event-detail';
/* eslint-disable import/default */
import MapView from 'react-native-maps';
import Event from './../models/event';

class EventDetail extends Component {
    constructor (props) {
        super(props);
        this._renderRSVPModal = this._renderRSVPModal.bind(this);
        this._renderAttendeeList = this._renderAttendeeList.bind(this);
        this._renderAttendeeListItem = this._renderAttendeeListItem.bind(this);
    }

    render () {
        const { event } = this.props.navigation.state.params;
        const { title, description, start, location } = event;
        const { modalVisible, rsvp, hideModal } = this.props;
        const rsvped = rsvp[title];

        return (
            <ScrollView style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.venue}>
                        Where: Vancouver, BC
                    </Text>
                    <Text style={styles.time}>
                        When: {start.format('dddd, MMMM D [at] h:mmA')}
                    </Text>
                    <Text style={styles.rsvp}>
                        {
                            rsvped ?
                                'You are going to this event!' :
                                'You have not RSVPed to this event yet.'
                        }
                    </Text>
                </View>
                {this._renderRSVPModal(modalVisible, hideModal)}
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
                        title={title} />
                </MapView>
                <Text style={styles.descriptionHeader}>
                    Details
                </Text>
                <Text style={styles.description}>
                    {description.text}
                </Text>
                <Text style={styles.attendeesHeader}>
                    Attendees
                </Text>
                {this._renderAttendeeList(event)}
            </ScrollView>
        );
    }

    _renderRSVPModal (visible, hide) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>RSVP Successful!</Text>
                    <Button
                        onPress={hide}
                        title="Awesome!"/>
                </View>
            </Modal>
        )
    }

    _renderAttendeeList (event) {
        if (event.attendees && event.attendees.length > 0) {
            return (
                <FlatList
                    style={styles.attendeesList}
                    data={event.attendees}
                    renderItem={this._renderAttendeeListItem}
                    keyExtractor={(item) => (item.avatar)} />
            );
        }
        else {
            return (
                <Text style={styles.attendeesList}>Nobody has RSVP'd yet!</Text>
            );
        }
    }

    _renderAttendeeListItem (item) {
        return (
            <View style={styles.attendeeListItem}>
                <Image
                    style={styles.attendeeAvatar}
                    source={{uri: item.item.avatar}} />
                <Text style={styles.attendeeName}>
                    {item.item.given_name} {item.item.surname}
                </Text>
            </View>
        );
    }
}

// Update RSVP state and show modal
const doRSVP = title => {
    store.dispatch(rsvp(title));
    store.dispatch(showModal());
}

const doCancel = title => {
    store.dispatch(unrsvp(title));
    store.dispatch(showModal());
}

// RSVP button in top right corner of event detail screen
class RSVPButton extends Component {
    constructor (props) {
        super(props);
        const rsvped = store.getState().rsvp[props.title];

        this.state = {
            rsvped
        }

        this.updateOnStoreChange = this.updateOnStoreChange.bind(this);

        // This is a big hack :-)
        store.subscribe(this.updateOnStoreChange);
    }

    updateOnStoreChange () {
        if (store.getState().rsvp[this.props.title] !== this.state.rsvped) {
            this.setState({
                rsvped: !this.state.rsvped
            });
        }
    }

    render () {
        const { rsvped } = this.state;
        const { title } = this.props;
        return (
            <Button
                onPress={
                    rsvped ?
                        () => doCancel(title) :
                        () => doRSVP(title)
                }
                title={
                    rsvped ?
                        'Cancel' :
                        'RSVP'
                } />
        );
    }
}


EventDetail.navigationOptions = ({ navigation }) => {
    const { event } = navigation.state.params;
    const { title } = event;
    return {
        title,
        headerRight: <RSVPButton title={title} />
    };
};

EventDetail.propTypes = {
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    rsvp: PropTypes.object,
    modalVisible: PropTypes.bool,
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                event: Event
            })
        })
    })
}

const mapStateToProps = ({ eventDetail, rsvp }) => ({
    rsvp,
    modalVisible: eventDetail.modalVisible
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDetail);

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
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2a2a2a'
    },
    time: {
        fontFamily: 'Apple SD Gothic Neo',
        fontSize: 16,
        color: '#2a2a2a'
    },
    map: {
        flex: 1,
        height: 400
    },
    description: {
        paddingHorizontal: 8
    },
    descriptionHeader: {
        paddingHorizontal: 8,
        paddingTop: 12,
        fontSize: 22,
        fontWeight: 'bold'
    },
    modalContainer: {
        backgroundColor: '#29e870',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Apple SD Gothic Neo',
        textAlign: 'center',
        color: '#2a2a2a'
    },
    attendeesHeader: {
        paddingHorizontal: 8,
        paddingTop: 12,
        fontSize: 22,
        fontWeight: 'bold'
    },
    attendeesList: {
        paddingHorizontal: 8,
        marginBottom: 16
    },
    attendeeListItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 64
    },
    attendeeAvatar: {
        height: 64,
        width: 64
    },
    attendeeName: {
        height: 64,
        paddingLeft: 4
    }
});

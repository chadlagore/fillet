import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';


/* A cell to represent an event in the EventList */
export default class EventCell extends Component {

    /* Constructor initializes event name (prop) and distance
     * from user (state).
     */
    constructor (props) {
        super(props);
        // TODO: Redux.
        this.state = { distance: 5 };
    }

    /* Render a horizontal event box. */
    render () {
        const { event } = this.props
        const { title } = event;
        console.log(event);
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => console.log('User wants event description...')}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoHeaderContainer}>
                        <Text style={styles.headerText}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.infoDescriptionContainer}>
                        <Text>
                            A description or address.
                        </Text>
                    </View>
                </View>
                <View style={styles.distanceContainer}>
                    <View style={styles.distanceHeader}>
                        <Text style={styles.headerText}>
                            Distance
                        </Text>
                    </View>
                    <View style={styles.distanceDescription}>
                        <Text>
                            12km
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

EventCell.propTypes = {
    event: PropTypes.shape({
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0.20,
        height: 80,
        borderBottomWidth: 1,
        borderTopWidth: 0.5
    },
    infoContainer: {
        flex: 0.75,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        borderRightWidth: 0.25
    },
    infoHeaderContainer: {
        flex: 0.25
    },
    infoDescriptionContainer: {
        flex: 0.75
    },
    distanceContainer: {
        flex: 0.25,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    distanceHeaderContainer: {
        flex: 0.25
    },
    distanceDescriptionContainer:{
        flex: 0.75
    },
    headerText: {
        fontSize: 18
    }
});

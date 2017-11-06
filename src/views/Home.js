import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { setLocation } from './../actions/user';
/* eslint-disable import/named */
import { Location, Permissions } from 'expo';

export class Home extends Component {
    constructor (props) {
        super(props);
        this.state = { permissionGranted: false };
        this.getLocation(props.setLocation);
    }

    async getLocation (cb) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ permissionGranted: status === 'granted' });
        const { coords } = await Location.getCurrentPositionAsync();
        cb({ lat: coords.latitude, lon: coords.longitude });
    }

    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Welcome to Eventador!</Text>
                <Button onPress={() => navigate('EventList')} title="Events" />
            </View>
        );
    }
}

Home.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    }),
    setLocation: PropTypes.func.isRequired
}

Home.navigationOptions = {
    title: 'Home'
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    setLocation: loc => dispatch(setLocation(loc))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

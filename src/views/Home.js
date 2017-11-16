import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { setUser, setAuthToken, setLocation } from './../actions/user';
import { getAuthToken } from './../api';
/* eslint-disable import/named */
import { Location, Permissions } from 'expo';
import { Google } from 'expo';

export class Home extends Component {
    constructor (props) {
        super(props);
        this.state = { permissionGranted: false };
        this.getLocation(props.setLocation);
        this._googleSignIn = this._googleSignIn.bind(this);
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
                {this._renderSigninButtons()}
            </View>
        );
    }

    _renderSigninButtons () {
        if (!this.props.user) {
            return (
                <Button
                    onPress={this._googleSignIn}
                    style={styles.googleSignIn}
                    title="Sign in with Google"/>
            );
        }
        else {
            return (
                <Text>
                    Token:
                    {this.props.token}
                </Text>
            );
        }
    }

    _googleSignIn () {
        Google.logInAsync({
            iosClientId: '148567986475-hjkjihnqn54603235u4rhilh54osclcc.apps.googleusercontent.com',
            webClientId: '148567986475-b6jh9fbl1d0186ku4gibml8619hafbnm.apps.googleusercontent.com'
        }).
        then(user => {
            this.props.setUser(user);
            getAuthToken({
                service: 'google',
                token: user.idToken
            }).
            then(
                token => this.props.setAuthToken(token),
                /* eslint-disable no-console */
                err => console.log(err)
            );
        });
    }
}

Home.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    }),
    setLocation: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setAuthToken: PropTypes.func.isRequired,
    token: PropTypes.string,
    user: PropTypes.object
}

Home.navigationOptions = {
    title: 'Home'
};

const mapStateToProps = state => ({
    user: state.user.user,
    token: state.user.token
});
const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
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
    },
    googleSignIn: {
        height: 60,
        width: 280
    }
});

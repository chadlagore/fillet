import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
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
        this._renderButtons = this._renderButtons.bind(this);
        this._renderSpinner = this._renderSpinner.bind(this);
    }

    async getLocation (cb) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ permissionGranted: status === 'granted' });
        const { coords } = await Location.getCurrentPositionAsync();
        cb({ lat: coords.latitude, lon: coords.longitude });
    }

    render () {
        return (
            <View style={styles.container}>
                {
                    this.state.loading ?
                        this._renderSpinner() :
                        this._renderButtons()
                }
            </View>
        );
    }

    _renderSpinner () {
        return (
            <ActivityIndicator size="large" />
        );
    }

    _renderButtons () {
        if (!this.props.token) {
            return (
                <View>
                    <TouchableOpacity
                        onPress={this._googleSignIn}
                        activeOpacity={0.6}>
                        <Image
                            style={{ width: 386, height: 96 }}
                            source={{ uri:  'http://www.setyourowntests.com/_/rsrc/1468869481521/help/accounts/btn_google_signin_dark_normal_web%402x.png' }} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.viewEvents}
                    activeOpacity={0.6}
                    onPress={() => this.props.navigation.navigate('EventList')}>
                    <Text style={styles.viewEventsText}>Discover Events</Text>
                </TouchableOpacity>
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
            this.setState({ loading: true });
            getAuthToken({
                service: 'google',
                token: user.idToken
            }).
            then(token => {
                this.props.setAuthToken(token);
                this.setState({ loading: false });
            }, err => {
                this.setState({ loading: false });
                /* eslint-disable no-console */
                console.error(err);
            });
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
    title: 'Eventador'
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewEvents: {
        backgroundColor: '#29e870',
        borderRadius: 4,
        borderWidth: 1,
        padding: 16,
        borderColor: 'transparent'
    },
    viewEventsText: {
        fontSize: 20,
        color: 'white'
    }
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton
} from 'react-native-google-signin';
import { connect } from 'react-redux';
import { setUser, setAuthToken } from './../actions/user';
import { getAuthToken } from './../api';

class Home extends Component {
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button onPress={() => navigate('EventList')} title="Event List" />
                {this._renderSigninButtons()}
            </View>
        );
    }

    _renderSigninButtons() {
        if (!this.props.user) {
            return (
                <GoogleSigninButton
                    style={styles.google_signin}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._googleSignIn.bind(this)}
                />
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

    componentDidMount() {
        GoogleSignin.configure({
            iosClientId: "148567986475-hjkjihnqn54603235u4rhilh54osclcc.apps.googleusercontent.com",
            webClientId: "148567986475-b6jh9fbl1d0186ku4gibml8619hafbnm.apps.googleusercontent.com",
            offlineAccess: true
        })
        .then(() => {
            GoogleSignin.signOut();
            this.props.setUser(undefined);
            // GoogleSignin.currentUserAsync()
            // .then(user => this.props.setUser(user));
        })
        .done();
    }

    _googleSignIn() {
        GoogleSignin.signIn()
        .then(user => {
            console.log(user.idToken);
            this.props.setUser(user);
            getAuthToken({
                service: 'google',
                token: user.idToken
            })
            .then(
                token => this.props.setAuthToken(token),
                err => console.log(err)
            );
        })
        .done();
    }
}

Home.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func
    })
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
    setAuthToken: token => dispatch(setAuthToken(token))
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
    google_signin: {
        height: 60,
        width: 280
    }
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Home extends Component {
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button onPress={() => navigate('EventList')} title="Event List" />
            </View>
        );
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Home from './src/views/Home';
import EventList from './src/views/EventList';
import EventFilter from './src/views/EventFilter';
import EventDetail from './src/views/EventDetail';
import store from './src/store';

const Navigator = StackNavigator({
    Home: { screen: Home },
    EventList: { screen: EventList },
    EventFilter: { screen: EventFilter },
    EventDetail: { screen: EventDetail }
});

AppRegistry.registerComponent('Navigator', () => Navigator);

/* eslint-disable react/prefer-stateless-function */
export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

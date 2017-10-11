import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './views/Home';
import EventList from './views/EventList';
import EventFilter from './views/EventFilter';
import EventDetail from './views/EventDetail';


const Navigator = StackNavigator({
    Home: { screen: Home },
    EventList: { screen: EventList },
    EventFilter: { screen: EventFilter },
    EventDetail: { screen: EventDetail }
});

AppRegistry.registerComponent('Navigator', () => Navigator);

export default class App extends Component {
    render () {
        return <Navigator />;
    }
}

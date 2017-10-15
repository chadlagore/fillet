import React, { Component } from 'react';
import {
    Text,
    AppRegistry
} from 'react-native';


export default class EventCell extends Component {
    render () {
        return (
            <Text>This is an EventCell with name {this.props.name}!</Text>
        );
    }
}

AppRegistry.registerComponent('EventCell', () => EventCell);

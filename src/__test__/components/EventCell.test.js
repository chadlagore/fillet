import 'react-native';
import React from 'react';
import EventCell from './../../components/EventCell';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const tree = renderer.create(
        <EventCell event={MockEvent} onPress={() => {}} />
    ).toJSON();
    expect(tree).toBeTruthy();
});

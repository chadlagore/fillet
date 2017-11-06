import 'react-native';
import React from 'react';
import { EventList } from './../../views/EventList';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const navigation = { navigate: () => {} };
    const tree = renderer.create(
        <EventList navigation={navigation} events={[MockEvent]} />
    ).toJSON();
    expect(tree).toBeTruthy();
});

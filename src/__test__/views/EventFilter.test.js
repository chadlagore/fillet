import 'react-native';
import React from 'react';
import { EventFilter } from './../../views/EventFilter';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const tree = renderer.create(
        <EventFilter />
    ).toJSON();
    expect(tree).toBeTruthy();
});

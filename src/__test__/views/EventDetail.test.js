import 'react-native';
import React from 'react';
import EventDetail from './../../views/EventDetail';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const navigation = {
        state: {
            params: {
                event: MockEvent
            }
        }
    }
    const tree = renderer.create(
        <EventDetail navigation={navigation}  />
    ).toJSON();
    expect(tree).toBeTruthy();
});

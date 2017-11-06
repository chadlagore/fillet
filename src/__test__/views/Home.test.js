import 'react-native';
import React from 'react';
import { Home } from './../../views/Home';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const navigation = { navigate: () => {} };
    const tree = renderer.create(
        <Home navigation={navigation} setLocation={() => {}} />
    ).toJSON();
    expect(tree).toBeTruthy();
});

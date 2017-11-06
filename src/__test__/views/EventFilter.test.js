import 'react-native';
import React from 'react';
import { EventFilter } from './../../views/EventFilter';
import MockEvent from './../../mocks/event';
import renderer from 'react-test-renderer';

test('should render', () => {
    const rendered = renderer.create(
        <EventFilter />
    );
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance()._showDateTimePicker();
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance()._hideDateTimePicker();
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance()._handleDatePicked(new Date());
    expect(rendered.toJSON()).toBeTruthy();
});

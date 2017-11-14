import reducer from './../../reducers/events';
import { addEvents, clearEvents } from './../../actions/events';

test('add events', () => {
    let state = reducer(null, addEvents([1, 2, 3]));
    expect(state.events).toEqual([1, 2, 3]);
    state = reducer({ events: [1] }, addEvents([2]));
    expect(state.events).toEqual([2]);
});

test('clear events', () => {
    let state = reducer(null, clearEvents());
    expect(state.events).toEqual([]);
    state = reducer({ events: [1] }, clearEvents());
    expect(state.events).toEqual([]);
});

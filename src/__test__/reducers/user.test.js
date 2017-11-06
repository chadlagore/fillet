import reducer from './../../reducers/user';
import { setLocation } from './../../actions/user';

test('set location', () => {
    const loc = { lat: 1, lon: 2 };
    let state = reducer(null, setLocation(loc));
    expect(state.location).toEqual(loc);
    state = reducer({ location: { lat: 2, lon: 3 } }, setLocation(loc));
    expect(state.location).toEqual(loc);
});

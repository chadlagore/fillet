import { mirror, prepend, buildURL } from './../util';

test('mirror', () => {
    const m = mirror(['a', 'b']);
    expect(m.a).toEqual('a');
    expect(m.b).toEqual('b');
});

test('prepend', () => {
    const p = prepend(['a', 'b'], 'c');
    expect(p[0]).toEqual('c_a');
    expect(p[1]).toEqual('c_b');
});

test('buildURL', () => {
    const url = buildURL('http://www.api.com')('/route')({ q: 'asdf' });
    expect(url).toEqual('http://www.api.com/route?q=asdf');
});

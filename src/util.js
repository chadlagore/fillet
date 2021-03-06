// Takes a list of strings and converts it to a map where
// each string maps to itself.
// ['a', 'b'] => {a: 'a', b: 'b'}
export const mirror = list => list.reduce((map, str) => ({ [str]: str, ...map }), {});

// Prepends each string in a list with another string.
// (['A', 'B'], 'C') => ['C_A', 'C_B']
export const prepend = (list, preface) => list.map(el => `${preface}_${el}`);

// Constructs a request from a base, a route, and a set of parameters.
export const buildRequest = base => (method, route) => (params, body, headers, token) => {
    let url = `${base}${route}`;
    console.log(url);
    const keys = Object.keys(params || {});
    const len = keys.length;
    if (len) {
        url = keys.reduce((u, k, i) => {
            const encodedKey = encodeURIComponent(k);
            const encodedValue = encodeURIComponent(params[k]);
            return `${u}${encodedKey}=${encodedValue}${i < len - 1 ? '&' : ''}`;
        }, `${url}?`);
    }
    console.log(url);
    return [url, {
        method: method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: (body ? JSON.stringify(body) : null)
    }];
}

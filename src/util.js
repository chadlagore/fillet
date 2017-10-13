// Takes a list of strings and converts it to a map where
// each string maps to itself.
// ['a', 'b'] => {a: 'a', b: 'b'}
export const mirror = list => list.reduce((map, str) => ({ [str]: str, ...map }), {});

// Prepends each string in a list with another string.
// (['A', 'B'], 'C') => ['C_A', 'C_B']
export const prepend = (list, preface) => list.map(el => `${preface}_${el}`);

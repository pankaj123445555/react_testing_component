const input = {
  user: {
    name: 'John',
    address: {
      city: 'New York',
      zip: '10001',
    },
  },
};

function flattenObj(input) {
  const obj = {};

  function solve(input, str) {
    for (let key of Object.keys(input)) {
      const res = str + '.' + key;
      if (typeof input[key] == 'object') {
        console.log('pankaj', input[key]);
        solve(input[key], res);
      } else {
        obj[res.substr(1)] = input[key];
      }
    }
  }

  solve(input, '');
  return obj;
}

const obj = flattenObj(input);
console.log(obj);

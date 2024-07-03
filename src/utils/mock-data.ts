// third-party
import { Chance } from 'chance';

const chance = new Chance();

export const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function mockData(index: number) {
  return {
    id: (index: number) => `${chance.bb_pin()}${index}`,
    email: chance.email({ domain: 'gmail.com' }),
    phoneNumber: chance.phone(),
    name: {
      first: chance.first(),
      last: chance.last(),
      full: chance.name()
    },
  };
}

export default mockData;

import mockData, { range } from '../utils/mock-data';

const newPerson = (index: number) => {
  const tempData = mockData(index);

  return {
    id: index,
    firstName: tempData.name.first,
    lastName: tempData.name.last,
    email: tempData.email,
    phoneNumber: tempData.phoneNumber,
    fatherName: tempData.name.full,
    dni: 11111,
  };
};

export default function makeData(...lens: any) {
  const makeDataLevel: any = (depth: number = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newPerson(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
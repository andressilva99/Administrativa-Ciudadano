import { useEffect, useMemo, useState } from 'react'; 
import { AuthService } from '../core/application/AuthService';

const fetchData = async () => {
  const authService = new AuthService();
  const response = await authService.findUsers();
  return response.list.map((user: any, index: number) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    fatherName: `${user.firstName} ${user.lastName}`,
    dni: user.dni,
    subRows: [],
  }));
};

export default function useData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return memoizedData;
}
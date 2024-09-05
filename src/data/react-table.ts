import { useEffect, useMemo, useState } from 'react';
import { FindUser } from '../core/use-cases/auth/FindUsers';
import { ApiService } from '../infrastructure/http/ApiService';
import { AuthRepository } from '../infrastructure/repository/AuthRepository';
import { IUserRegister } from '../core/entities/auth/IUserRegister';
import { IUserData } from '../core/entities/auth/IUserData';

export default function useData() {
  const [data, setData] = useState<IUserData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiService = new ApiService();
        const authRepository = new AuthRepository(apiService);
        const findUser = new FindUser(authRepository);

        const users = await findUser.findUsers();

        const formattedData = users.map((user: IUserRegister) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          fatherName: `${user.firstName} ${user.lastName}`,
          dni: user.dni,
          subRows: [],
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return memoizedData;
}

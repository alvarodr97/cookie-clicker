import { useEffect, useState } from "react";
import { Stores, User, getStoreData, initDB } from '../lib/db';

export const useDB = () => {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ranking, setRanking] = useState<User[]>([]);

  useEffect(() => {
    const initializeDB = async () => {

        // if (status) return;

      setIsLoading(true);

      try {
        await initDB();
        setStatus(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }

    };

    initializeDB();

  }, []);

useEffect(() => {
    if (!status) return;
    const handleGetUsers = async () => {
    const users = await getStoreData<User>(Stores.Users);
    setRanking(users);
  };
  handleGetUsers();
}, [status])

  return { status, isLoading, ranking };
};

import { useEffect, useState } from "react";
import { Stores, User, getStoreData } from "../lib/db";

export const useRanking = (status: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ranking, setRanking] = useState<User[]>([]);

  // Ranking
  useEffect(() => {
    if (!status) return;

    setIsLoading(true);
    const handleGetUsers = async () => {
      try {
        const users = await getStoreData<User>(Stores.Users);
        setRanking(users);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetUsers();
  }, [status]);

  return { isLoading, ranking };
};

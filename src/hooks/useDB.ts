import { useEffect, useState } from "react";
import { initDB } from "../lib/db";

export const useDB = () => {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar DB
  useEffect(() => {
    const initializeDB = async () => {
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

  return { status, isLoading };
};

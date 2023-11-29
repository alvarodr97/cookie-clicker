import { useEffect, useState } from "react";
import { Stores, User, getUserData, updateData } from "../lib/db";

export const useUser = (userName: string) => {
  // const [data, setData] = useState<User>();
  const [cookies, setCookies] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    const fetchCookies = async () => {
      setIsLoading(true);

      try {
        await getUserData<User>(Stores.Users, userName).then((data) => {
          console.log(data);
          setCookies(data?.cookies);
          console.log("Cookies del hook: " + data?.cookies)
        });
      } catch (err) {
        if (err instanceof Error) {
          setUserError(err.message);
        } else {
          setUserError("Something went wrong");
        }
      }
    };
    fetchCookies();
  }, [userName]);

  useEffect(() => {
    if (!cookies) return;
    console.log("ESTOY CAMBIANDO EL VALOR DE LAS COOKIES")

    const updateCookies = async () => {
        await updateData(Stores.Users, userName, {cookies: cookies})
    }
    updateCookies();

  }, [cookies])

  return { cookies, setCookies, isLoading, userError };
};

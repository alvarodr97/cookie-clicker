import { useEffect, useState } from "react";
import { Stores, User, addData, getUserData, updateData } from "../lib/db";

export const useUser = (userName: string) => {
  const [cookies, setCookies] = useState<number>();
  const [nivel, setNivel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userError, setUserError] = useState("");
const [isFirstRun, setIsFirstRun] = useState(true);

  // recuperar datos
  useEffect(() => {
    const fetchCookies = async () => {
      setIsLoading(true);

      try {
        await getUserData<User>(Stores.Users, userName).then((data) => {
            // si no existe data, el usuario es nuevo y se crea
            if (!data) {
                // console.log("EL USUARIO ES NUEVO");
                (async () => {
                    try {
                        await addData(Stores.Users, {name: userName, cookies: 0, nivel: 1});
                        setCookies(0)
                    } catch (err) {
                      return console.log(err);
                    }
                  })()
                
            } else {
                // Si ya existe, se asignan las cookies
                setCookies(data!.cookies);
                setNivel(data!.nivel);
                // console.log("EL USUARIO YA EXISTIA")
            }
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

  // actualizar cookies
  useEffect(() => {
    if (!cookies) return;
    console.log("ESTOY CAMBIANDO EL VALOR DE LAS COOKIES")

    const updateCookies = async () => {
        await updateData(Stores.Users, userName, {cookies})
    }
    updateCookies();

  }, [cookies])

  // actualizar nivel
  useEffect(() => {
    if (nivel === 1 || isFirstRun) return;
    console.log("ESTOY CAMBIANDO EL VALOR DEL NIVEL")

    const updateLevel= async () => {
        await updateData(Stores.Users, userName, {nivel})
        setCookies(cookies => cookies! - (50 * (nivel-1)))
    }
    updateLevel();

  }, [nivel])

  // auto-clicker
  useEffect(() => {
    if (nivel === 1) return;

    console.log("AUTO CLICK")

    const intervalId = setInterval(() => {
        setCookies((cookies) => cookies! + (nivel-1));
      }, 100);

    return () => {
        clearInterval(intervalId)
    }


  }, [nivel])

  return { cookies, setCookies, nivel, setNivel, isLoading, userError, isFirstRun, setIsFirstRun };
};

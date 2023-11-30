import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import exit from "../assets/exit.png";
import user from "../assets/user.png";
import buy from "../assets/buy.png";

export const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location?.state?.name;

  // Si no se ha introducido un usuario, vuelve a la pagina principal
  if (!userName) return <Navigate to="/" state={{ from: location }} replace />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { cookies, setCookies, nivel, setNivel, setIsFirstRun } = useUser(userName);

  return (
    <div className="flex flex-col items-center gap-y-12 w-full ">
      <div className="flex flex-row w-full justify-between max-w-sm px-5 md:px-2">
        <div className="flex flex-row justify-center items-center gap-x-1">
          <img className="w-4 h-4" title="Usuario" src={user} />

          <p className="font-bold">{userName}</p>
        </div>

        <p>
          Cookies: <span className="font-semibold">{cookies}</span>{" "}
        </p>

        <p>Nivel: {nivel} </p>
      </div>

      <button
        className="bg-yellow-400 p-4 rounded-full hover:bg-opacity-70 transition-all"
        onClick={() => setCookies((cookies) => cookies! + 1)}
      >
        + Cookie
      </button>

      <div className="flex flex-col gap-y-4">
        <div>
          <button
            title="Comprar"
            className={`bg-yellow-400 ${
              cookies! >= 50 * nivel
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } flex flex-row justify-center items-center px-10 py-2`}
            disabled={cookies! < 50 * nivel ? true : false}
            onClick={() => {
              setIsFirstRun(false);
              setNivel((nivel) => nivel + 1);
            }}
          >
            <img className="w-4 h-4 mr-1" title="Comprar" src={buy} />
            auto-click ({50 * nivel})
          </button>
        </div>
      </div>

      <div>
        <button onClick={() => navigate("/")} title="Salir">
          <img className="w-7 h-7" alt="Salir" src={exit} />
        </button>
      </div>
    </div>
  );
};

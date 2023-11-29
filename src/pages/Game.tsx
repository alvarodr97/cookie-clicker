import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location?.state?.name;

  // Si no se ha introducido un usuario, vuelve a la pagina principal
  if (!userName) return <Navigate to="/" state={{ from: location }} replace />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { cookies, setCookies, nivel, setNivel, setIsFirstRun } = useUser(userName);





  


  return (
    <div>
      <p>Nombre del usuario</p>
      <p>Nombre: {userName}</p>
      <p>Cookies: {cookies} </p>
      <button
        onClick={() => navigate("/")}
      >Salir</button>

      <button className="bg-green-500" onClick={() => setCookies(cookies => cookies! +1)}>
        +1
      </button>

      {
        cookies! >= 50 && (
          <>
            {/* <button className="bg-yellow-400" onClick={() => setNivel(nivel => nivel +1) }> */}
            <button className="bg-yellow-400" onClick={() => { setIsFirstRun(false); setNivel(nivel => nivel +1)} }>
              Comprar auto-merger ({50 * nivel})
            </button>
            <p>Nivel: {nivel} </p>
          </>
        )
      }
    </div>
  )
}

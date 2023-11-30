import { Outlet, useOutletContext } from "react-router-dom";
import { useDB } from "./hooks/useDB";

type ContextType = { status: boolean };

function App() {
  const { status, isLoading } = useDB();

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-500 text-white">
        Cargando base de datos...
      </div>
    );

  if (!isLoading && !status)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-500 text-white">
        El servidor no responde
      </div>
    );

  return (
    <div className="bg-red-100 h-screen">
      <div className="max-w-6xl m-auto h-screen pt-24 flex flex-col items-center">
        <h1 className="text-yellow-600 text-center pb-4 font-bold text-2xl">
          Cookie Clicker
        </h1>
        <div className="border-b border-b-yellow-600 w-32 mb-10" />
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          <Outlet context={{ status }} />
        </div>
      </div>
    </div>
  );
}

export default App;

export function useStatus() {
  return useOutletContext<ContextType>();
}

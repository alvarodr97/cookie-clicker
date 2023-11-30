import { Outlet, useOutletContext } from "react-router-dom";
import { useDB2 } from "./hooks/useDB2";

type ContextType = { status: boolean };

function App() {
  const { status, isLoading, } = useDB2();
  

  if (isLoading) return <div>Cargando DB...</div>

  if (!isLoading && !status) return <div>El servidor no responde</div>

  return (
    <div className="bg-red-100 h-screen">
      <div className="max-w-6xl m-auto h-screen pt-24 flex flex-col items-center">
        <h1 className="text-yellow-600 text-center pb-4 font-bold text-2xl">
          Cookie Clicker
        </h1>
        <div className="border-b border-b-yellow-600 w-32 mb-10" />
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          <Outlet context={{status}} />
        </div>
      </div>
    </div>
  );
}

export default App;

export function useStatus() {
  return useOutletContext<ContextType>();
}
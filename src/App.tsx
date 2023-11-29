import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-500/90">
      <h1 className="text-yellow-500">COOOKIEEES</h1>
      <div className="h-screen flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

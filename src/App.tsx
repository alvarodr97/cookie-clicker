import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-red-100 h-screen">
      <div className="max-w-6xl m-auto h-screen pt-24 flex flex-col items-center">
        <h1 className="text-yellow-600 text-center pb-4 font-bold text-2xl">
          Cookie Clicker
        </h1>
        <div className="border-b border-b-yellow-600 w-32 mb-10" />
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

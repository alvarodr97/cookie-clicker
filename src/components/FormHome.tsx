import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initDB } from "../lib/db";

export const FormHome = () => {
  const [inputName, setInputName] = useState("");
  // const [isDBReady, setIsDBReady] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await initDB();

    // const status = await initDB();
    // setIsDBReady(status);

    const name = inputName;

    if (name.trim() === "") {
      alert("Introduce un nombre.");
      return;
    }

    navigate("/game", { state: { name }, replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder={`"Cookie Monster"`}
          value={inputName}
          required
          onChange={(e) => setInputName(e.target.value)}
          className="border border-black"
        />

        <button
          className={`p-4 text-black ${
            inputName !== "" ? "bg-green-500" : "bg-red-500"
          }`}
          disabled={inputName !== "" ? false : true}
        >
          Jugar
        </button>

        {/* {!isDBReady ? <button>Init DB</button> : <h2>DB is ready</h2>} */}
      </form>

      {/* //TODO: Añadir aqui el ranking */}
    </div>
  );
};

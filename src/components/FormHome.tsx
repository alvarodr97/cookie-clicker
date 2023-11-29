// import { useEffect, useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDB } from "../hooks/useDB";
// import { initDB } from "../lib/db";

export const FormHome = () => {

  // const { status, isLoading } = useDB();

  // useEffect(() => {
  //   initDB();
  // }, [])
  
  
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // await initDB();

    const name = inputName;

    if (name.trim() === "") {
      alert("Introduce un nombre.");
      return;
    }

    // navigate("/game", { state: { name }, replace: true });
    navigate("/game", { state: { name } });
  };

  return (
    <div>
      <h2 className="pb-1 font-semibold">Introduce tu nombre:</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          maxLength={10}
          placeholder={`"Cookie Monster"`}
          value={inputName}
          required
          onChange={(e) => setInputName(e.target.value)}
          className="border border-black p-3 rounded-md"
        />

        <button
          className={`mt-4 p-4 bg-yellow-600 text-black rounded-md transition-all ${
            inputName !== "" ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"
          }`}
          disabled={inputName !== "" ? false : true}
        >
          <span className="font-bold">Jugar</span>
        </button>
      </form>
    </div>
  );
};

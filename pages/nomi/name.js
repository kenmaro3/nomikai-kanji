import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function NomiName() {
  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const router = useRouter()

  const [name, setName] = useState("");

  useEffect(() => {
    setName(nomi.name)
  }, [nomi]);

  const handleNameOnChange = (e) => {
    setName(e.target.value);
    dispatch(nomiSlice.actions.setName({ name: e.target.value }));
  };

  const goToStep2 = (e) => {
    if (name === "" || name === null || name === undefined) {
      return
    }
    e.preventDefault();
    router.push("/nomi/date");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
          🐱 ノミカイネーム
        </span>
        <input
          type="text"
          className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="クレイジー・ノミカイ"
          value={name}
          onChange={handleNameOnChange}
        />
      </label>

      <button
        onClick={(e) => goToStep2(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-4"
      >
        Next
      </button>
    </div>
  );
}

export default NomiName;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Router from "next/router";
import { nomiSlice } from "../../store/nomi";

function CreateNomi1() {
  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };
  const handleUpdate = () => {
    //const updatedNomi = Object.assign(nomi, {name: name})
    console.log("this is nomi", nomi);
    const updatedNomi = { ...nomi, name: name };
    console.log("updatedNomi", updatedNomi);
    dispatch(nomiSlice.actions.updateNomi(updatedNomi));
  };

  const goToStep2 = (e) => {
    handleUpdate();
    e.preventDefault();
    Router.push("/nomi/create2");
    console.log("nomi", nomi);
  };

  useEffect(() => {
    console.log("name", name);
  }, [name]);
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Nomi Name
        </span>
        <input
          type="text"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="crazy nomi"
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

export default CreateNomi1;

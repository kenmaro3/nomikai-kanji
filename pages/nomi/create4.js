import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function CreateNomi4() {
  const router = useRouter()

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [passcode, setPasscode] = useState();

  useEffect(() => {
    setPasscode(nomi.passcode)
  }, [nomi]);


  const goToStep5 = (e) => {
    dispatch(nomiSlice.actions.setPasscode({ passcode: passcode }));
    e.preventDefault();
    router.push("/nomi/create5");
  };

  const handleInputChange = (e) => {
    setPasscode(e.target.value);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          passcode
        </span>
        <input
          type="text"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="mypasscode"
          value={passcode}
          onChange={(e) => handleInputChange(e)}
        />
      </label>

      <button
        onClick={(e) => goToStep5(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-4"
      >
        Next
      </button>
    </div>
  );
}

export default CreateNomi4;

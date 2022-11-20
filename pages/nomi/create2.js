import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import Router from "next/router";
import { nomiSlice } from "../../store/nomi";

function CreateNomi2() {
  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(nomi.date)
  }, [nomi]);

  const handleOnChange = (date) => {
    console.log("🚀 ~ file: create2.js ~ line 20 ~ handleOnChange ~ e", date)
    setDates(date)

  };

  const goToStep3 = (e) => {
    dispatch(nomiSlice.actions.setDate({ date: dates }));
    e.preventDefault();
    Router.push("/nomi/create3");
    console.log("nomi", nomi);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Nomi Dates
        </span>
        <DatePicker value={dates} onChange={(date) => handleOnChange(date)} multiple />
      </label>

      <button
        onClick={(e) => goToStep3(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
      >
        Next
      </button>
    </div>
  );
}

export default CreateNomi2;

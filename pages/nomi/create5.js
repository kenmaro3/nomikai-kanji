import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import DatePicker from "react-multi-date-picker";
import Router from "next/router";

function CreateNomi5() {

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState([]);

  useEffect(() => {
    setDeadline(nomi.deadline)
  }, [nomi]);

  const handleOnChange = (date) => {

    console.log("🚀 ~ file: create2.js ~ line 20 ~ handleOnChange ~ e", date)
    setDeadline(date)
    dispatch(nomiSlice.actions.setDeadline({ deadline: date }));

  };

  const goToConfirm = (e) => {
    e.preventDefault();
    Router.push("/nomi/confirm");
  };



  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Deadline for voting
        </span>
        <DatePicker value={deadline} onChange={(date) => handleOnChange(date)} />
      </label>

      <button
        onClick={(e) => goToConfirm(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
      >
        Next
      </button>
    </div>
  );
}

export default CreateNomi5;

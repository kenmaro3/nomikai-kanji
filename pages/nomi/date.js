import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function NomiDate() {
  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const router = useRouter()

  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(nomi.date)
  }, [nomi]);

  const handleOnChange = (date) => {
    setDates(date)
    dispatch(nomiSlice.actions.setDate({ date: date }));

  };

  const goToStep3 = (e) => {
    e.preventDefault();
    if (dates === undefined) {
      return
    }
    if (dates.length === 0) {
      return
    }
    router.push("/nomi/time");
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
          📆 ノミカイ日時
        </span>
        <div className="mt-3 px-3 py-2">
          <DatePicker value={dates} onChange={(date) => handleOnChange(date)} multiple />
        </div>
      </label>

      <button
        onClick={(e) => goToStep3(e)}
        className="mt-3 bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
      >
        Next
      </button>
    </div>
  );
}

export default NomiDate;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import DatePicker from "react-multi-date-picker";
import { useRouter } from "next/router"

function NomiDeadline() {
  const router = useRouter()

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState([]);

  useEffect(() => {
    setDeadline(nomi.deadline)
  }, [nomi]);

  const handleOnChange = (date) => {

    setDeadline(date)
    dispatch(nomiSlice.actions.setDeadline({ deadline: date }));

  };

  const goToConfirm = (e) => {
    if (deadline === null || deadline === undefined) {
      return
    }
    e.preventDefault();
    router.push("/nomi/confirm");
  };



  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
          📆 回答締め切り日
        </span>
        <div className="mt-3 mb-3">
          <DatePicker value={deadline} onChange={(date) => handleOnChange(date)} />
        </div>
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

export default NomiDeadline;

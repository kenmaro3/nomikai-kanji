import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { voteSlice } from "../../store/vote"

import { distinct } from "../../lib/util"


function Location() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const dispatch = useDispatch();

  const [locationS, setLocationS] = useState([]);
  const [locationBoolean, setLocationBoolean] = useState([false, false])




  const handleSelected = (e, i) => {
    console.log("selected", i)
    console.log("🚀 ~ file: location.js ~ line 27 ~ handleSelected ~ locationBoolean", locationBoolean)

    let tmpBoolean = [...locationBoolean]
    tmpBoolean[i] = !tmpBoolean[i]
    console.log("🚀 ~ file: location.js ~ line 32 ~ handleSelected ~ tmpBoolean", tmpBoolean)

    if (tmpBoolean[i]) {
      let tmp = [...locationS, plan.location[i]]
      console.log("🚀 ~ file: location.js ~ line 34 ~ handleSelected ~ tmp", tmp)
      setLocationS(tmp.filter(distinct))
      dispatch(voteSlice.actions.setLocation(tmp.filter(distinct)));
    }
    else {
      let index = locationS.indexOf(plan.location[i])
      let tmp = [...locationS]
      console.log("🚀 ~ file: location.js ~ line 41 ~ handleSelected ~ tmp", tmp)
      tmp.splice(index, 1)
      console.log("🚀 ~ file: location.js ~ line 43 ~ handleSelected ~ tmp", tmp)
      setLocationS(tmp)
      dispatch(voteSlice.actions.setLocation(tmp));

    }
    //dispatch(voteSlice.actions.setLocation(tmp));
    const el = document.getElementById(`list-radio-${i}`);
    el.checked = tmpBoolean[i]
    setLocationBoolean(tmpBoolean)
    console.log("🚀 ~ file: location.js ~ line 52 ~ handleSelected ~ tmpBoolean", tmpBoolean)
  }

  const goToNext = (e) => {
    e.preventDefault()
    console.log("vote location confirm: ", locationS)
    router.push("/vote/venue")
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <label className="block">
        <span className="mb-2 block text-lg font-medium text-slate-700">
          場所に投票
        </span>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {plan.location.map((el, i) => (

            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input onClick={(e) => handleSelected(e, i)} id={`list-radio-${i}`} type="radio" value={locationS[i]} name={`list-radio-${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label for="list-radio-license" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{el}</label>
              </div>
            </li>
          ))}
        </ul>
      </label>

      <button
        onClick={(e) => goToNext(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-3"
      >
        Next
      </button>
      <div></div>


    </div>
  )
}

export default Location
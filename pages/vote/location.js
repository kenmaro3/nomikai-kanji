import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { voteSlice } from "../../store/vote"
import Router from "next/router"


function Location() {
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const dispatch = useDispatch();

  const [locationS, setLocationS] = useState([]);

  useEffect(() => {
    let tmp = []
    plan.location.forEach((el, i) => tmp.push(false))
    setLocationS(tmp)
    console.log("🚀 ~ file: [id].js ~ line 23 ~ useEffect ~ locationS", locationS)


  }, [plan])

  const handleSelected = (e, i) => {
    console.log("selected", i)
    //setLocationS({ ...locationS, i: !currentSelection })
    let tmp = locationS
    tmp[i] = !tmp[i]
    setLocationS(tmp)
    const el = document.getElementById(`list-radio-${i}`);
    el.checked = tmp[i]
    console.log("🚀 ~ file: [id].js ~ line 28 ~ handleSelected ~ locationS", locationS)
  }

  const goToConfirm = (e) => {
    e.preventDefault()
    console.log("vote location confirm: ", locationS)
    dispatch(voteSlice.actions.setLocation(locationS));
    Router.push("/vote/confirm")
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <label className="block">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Nomi Location</h3>
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
        onClick={(e) => goToConfirm(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-3"
      >
        Next
      </button>
      <div></div>


    </div>
  )
}

export default Location
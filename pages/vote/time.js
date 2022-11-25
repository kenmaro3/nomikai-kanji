import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { voteSlice } from "../../store/vote"



function VoteTime() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [planToShow, setPlanToShow] = useState()

  const [radioInput, setRadioInput] = useState({})

  useEffect(() => {
    let tmp = {}
    Object.keys(plan.time).map((time) => {
      tmp[time] = false
    })
    setRadioInput(tmp)
    setPlanToShow(plan)

  }, [])

  useEffect(() => {
    setPlanToShow(plan)

  }, [plan])

  const handleSelected = (e, time) => {
    let tmp = { ...radioInput }
    tmp[time] = !tmp[time]
    setRadioInput(tmp)
    dispatch(voteSlice.actions.setTime(tmp));
    const el = document.getElementById(`list-radio-${time}`);
    el.checked = tmp[time]
  }

  const goToNext = (e) => {
    e.preventDefault()
    router.push("/vote/location")
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <label className="block">
        <h3 className="mb-4 font-semibold text-gray-900 ">ノミカイ時刻</h3>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
          {
            (() => {
              if (planToShow !== undefined) {
                return Object.keys(planToShow?.time).map((el, i) => (

                  <li className="w-full rounded-t-lg border-b border-gray-200 ">
                    <div className="flex items-center pl-3">
                      <input onClick={(e) => handleSelected(e, planToShow?.time[el])} id={`list-radio-${planToShow.time[el]}`} type="radio" name={`list-radio-${planToShow.time[el]}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 " />
                      <label for="list-radio-license" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">{planToShow.time[el]}</label>
                    </div>
                  </li>
                ))
              }

            })()
          }
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

export default VoteTime
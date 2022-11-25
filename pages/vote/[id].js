import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { voteSlice } from "../../store/vote"

import { ts_to_date } from "../../lib/util"


function Vote() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [planToShow, setPlanToShow] = useState()

  const [radioInput, setRadioInput] = useState({})

  useEffect(() => {
    let tmp = {}
    Object.keys(plan.date).map((date) => {
      tmp[date] = false
    })
    setRadioInput(tmp)
    setPlanToShow(plan)

  }, [])

  useEffect(() => {
    setPlanToShow(plan)

  }, [plan])

  const handleSelected = (e, date) => {
    let tmp = { ...radioInput }
    tmp[date] = !tmp[date]
    setRadioInput(tmp)
    dispatch(voteSlice.actions.setDate(tmp));
    const el = document.getElementById(`list-radio-${date}`);
    el.checked = tmp[date]
  }

  const goToLocationVote = (e) => {
    e.preventDefault()
    router.push("/vote/location")
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <label className="block">
        <h3 className="mb-4 font-semibold text-gray-900 ">Nomi Dates</h3>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
          {
            (() => {
              if (planToShow !== undefined) {
                return Object.keys(planToShow?.date).map((el, i) => (

                  <li className="w-full rounded-t-lg border-b border-gray-200 ">
                    <div className="flex items-center pl-3">
                      <input onClick={(e) => handleSelected(e, planToShow?.date[el])} id={`list-radio-${planToShow.date[el]}`} type="radio" name={`list-radio-${planToShow.date[el]}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 " />
                      <label for="list-radio-license" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">{ts_to_date(planToShow.date[el])}</label>
                    </div>
                  </li>
                ))
              }

            })()
          }
        </ul>
      </label>

      <button
        onClick={(e) => goToLocationVote(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-3"
      >
        Next
      </button>
      <div></div>

    </div>
  )
}

export default Vote
import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { voteSlice } from "../../store/vote"

import { distinct } from "../../lib/util"

function VoteVenue() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const dispatch = useDispatch();
  //const [radioInput, setRadioInput] = useState([[false, false, false], [false, false, false]])
  const [radioInput, setRadioInput] = useState({})
  const [planToShow, setPlanToShow] = useState()

  useEffect(() => {
    let tmp = {}
    Object.keys(plan.venue).forEach((location) => {
      let tmp2 = {}
      Object.keys(plan.venue[location]).forEach((linkIndex) => {
        //tmp2[plan.venue[location][linkIndex]] = false
        tmp2[plan.venue[location][linkIndex]] = false
      })
      tmp[location] = tmp2
    })
    setRadioInput(tmp)
    dispatch(voteSlice.actions.setVenue(tmp))
    setPlanToShow(plan)

  }, [])

  useEffect(() => {
    setPlanToShow(plan)

  }, [plan])


  const handleSelected = (e, location, venue, venueIndex) => {
    let tmp = { ...radioInput }
    let tmp2 = { ...tmp[location] }
    tmp2[venue] = !tmp2[venue]
    tmp[location] = tmp2
    //tmp[location][venue] = !tmp[location][venue]

    setRadioInput(tmp)
    dispatch(voteSlice.actions.setVenue(tmp))

    const el = document.getElementById(`list-radio-${location}-${venueIndex}`);
    el.checked = tmp2[venue]

  }


  const goToNext = (e) => {
    e.preventDefault()
    router.push("/vote/confirm")
  }


  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <label className="block">
        <span className="mb-2 block text-lg font-medium text-slate-700">
          お店に投票
        </span>



        {(() => {
          if (vote.location) {
            return Object.keys(pplanToShowlan.venue).map((location) => {
              if (vote.location[location]) {
                return (
                  <>
                    <div className='text-slate-700 text-md font-medium'>{location}</div>
                    <ul className="w-48 mt-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                      {
                        (() => {
                          return Object.keys(planToShow.venue[location]).map((venueIndex) => {
                            if (planToShow.venue[location][venueIndex] !== "") {
                              return (
                                <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                                  <div className="flex items-center pl-3">
                                    <input onClick={(e) => handleSelected(e, location, planToShow.venue[location][venueIndex], venueIndex)} id={`list-radio-${location}-${venueIndex}`} type="radio" value={planToShow.venue[location][venueIndex]} name={`list-radio-${location}-${venueIndex}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <a href={planToShow.venue[location][venueIndex]} for="list-radio-license" target="_blank" rel="noopener noreferrer" className="overflow-hidden py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{planToShow.venue[location][venueIndex]}</a>
                                  </div>
                                </li>
                              )

                            }

                          })

                        })()
                      }

                    </ul>
                  </>


                )
              }
            })
          }
        })()}

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

export default VoteVenue
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
  const [radioInput, setRadioInput] = useState([[false, false, false], [false, false, false]])
  const [links, setLinks] = useState([])


  const handleSelected = (e, locationIndex, venueIndex) => {
    console.log("here")
    console.log(e.target.value, locationIndex, venueIndex)

    let tmpBoolean = [...radioInput]
    tmpBoolean[locationIndex][venueIndex] = !tmpBoolean[locationIndex][venueIndex]
    setRadioInput(tmpBoolean)
    console.log("🚀 ~ file: venue.js ~ line 26 ~ handleSelected ~ tmpBoolean", tmpBoolean)
    const el = document.getElementById(`list-radio-${locationIndex}-${venueIndex}`);
    el.checked = tmpBoolean[locationIndex][venueIndex]

    if (tmpBoolean[locationIndex][venueIndex]) {
      let tmp = [...links, e.target.value]
      setLinks(tmp.filter(distinct))
      dispatch(voteSlice.actions.setVenue(tmp.filter(distinct)))
    }
    else{
      let index = links.indexOf(e.target.value)
      let tmp = [...links]
      tmp.splice(index, 1)
      setLinks(tmp)
      dispatch(voteSlice.actions.setVenue(tmp))
    }





  }

  // useEffect(() => {
  //   setLinks([])
  //   vote.location?.forEach((el) => {
  //     plan.venue[el].forEach((venueEl) => {
  //       console.log("el", venueEl)
  //       setLinks([...links, venueEl])
  //     })

  //   })
  //   console.log("links", links)

  // }, [vote])


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

        {vote.location &&
          <div className='text-slate-700 text-md font-medium'>{vote.location[0]}</div>
        }
        <ul className="w-48 mt-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">

          {vote.location &&
            plan.venue[vote.location[0]].map((el, i) => (
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input onClick={(e) => handleSelected(e, 0, i)} id={`list-radio-${0}-${i}`} type="radio" value={el} name={`list-radio-${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <a href={el} for="list-radio-license" target="_blank" rel="noopener noreferrer" className="overflow-hidden py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{el}</a>
                </div>
              </li>

            ))
          }
        </ul>

        {vote.location &&
          <div className='text-slate-700 text-md font-medium mt-4'>{vote.location[1] ? vote.location[1] : ""}</div>
        }
        <ul className="w-48 mt-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {vote.location &&
            plan.venue[vote.location[1]]?.map((el, i) => (
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input onClick={(e) => handleSelected(e, 1, i)} id={`list-radio-${1}-${i}`} type="radio" value={el} name={`list-radio-${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <a href={el} for="list-radio-license" target="_blank" rel="noopener noreferrer" className="overflow-hidden py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{el}</a>
                </div>
              </li>

            ))

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

export default VoteVenue
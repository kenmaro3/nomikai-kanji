import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { voteSlice } from "../../store/vote";
import axios from "axios";
import { useRouter } from "next/router"

import { ts_to_date } from "../../lib/util"


function VoteConfirm() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const goToModify = (e) => {
    e.preventDefault();
    dispatch(voteSlice.actions.reset())
    dispatch(voteSlice.actions.setPlanId(plan.id));
    dispatch(voteSlice.actions.setVoterId(user.id));
    router.push(`/vote/${plan.id}`);
  };

  const goToOk = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/plans/vote", {
      voter_id: vote.voter_id,
      plan_id: vote.plan_id,
      location: vote.location,
      venue: vote.venue,
      date: vote.date,
    })
    console.log("🚀 ~ file: confirm.js ~ line 31 ~ goToOk ~ res", res)

    router.push(`/nomi/${plan.id}`);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
          Confirmation
        </span>
        <div className="flex flex-row">
          <div className="mx-2 flex flex-col">
            <div className="mt-1 text-md font-medium text-slate-800">飲み会名: <div className="text-md text-slate-600">{plan.name}</div></div>
            <div className="mt-1 text-md font-medium text-slate-800">日時 Vote:
              <span className="text-md text-slate-600">{vote.date?.map((el) => (<div className={el ? `` : `line-through`}>{ts_to_date(el)}</div>))}</span>
            </div>

          </div>

          <div className="mr-2 ml-4 flex flex-col">
            <div className="mt-1 text-md font-medium text-slate-800">場所 Vote:
              <span className="text-md text-slate-600">{vote.location?.map((el, i) => (<div className={el ? `` : `line-through`}>{plan.location[i]}</div>))}</span>
            </div>

            <div className="mt-1 text-md font-medium text-slate-800">お店 Vote:
              {
                vote.venue?.map((venueElement) => (
                  <div>
                    <a href={venueElement} className="text-md text-slate-600">{venueElement}</a>
                  </div>
                ))
              }
            </div>

          </div>

        </div>
      </label >

      <div className="mt-5">
        <button
          onClick={(e) => goToModify(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mr-3"
        >
          修正
        </button>

        <button
          onClick={(e) => goToOk(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          OK
        </button>
      </div>
    </div >
  )
}

export default VoteConfirm
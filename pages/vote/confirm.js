import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { voteSlice } from "../../store/vote";
import Router from "next/router";
import axios from "axios";

import { ts_to_date } from "../lib/util"


function confirm() {
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const goToModify = (e) => {
    e.preventDefault();
    dispatch(voteSlice.actions.reset())
    dispatch(voteSlice.actions.setPlanId(plan.id));
    dispatch(voteSlice.actions.setVoterId(user.id));
    Router.push(`/vote/${plan.id}`);
  };

  const goToOk = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://localhost:3000/api/plans/vote", {
      voter_id: vote.voter_id,
      plan_id: vote.plan_id,
      location: vote.location,
      date: vote.date
    })
    console.log("🚀 ~ file: confirm.js ~ line 31 ~ goToOk ~ res", res)

    Router.push(`/nomi/${plan.id}`);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Confirmation
        </span>
        <div className="flex flex-col">
          <div>name: {plan.name}</div>
          <div>selected date:
            {
              vote.date?.map((el, i) => (

                //<div>{ts_to_date(plan.date[i])}</div>
                <div className={el ? `` : `line-through`}>{ts_to_date(plan.date[i])}</div>

              )
              )}

            {/* {nomi.date?.map((el) => (<div>{ts_to_date(el)}</div>))} */}

          </div>
          <div>location:
            {
              vote.location?.map((el, i) => (

                <div className={el ? `` : `line-through`}>{plan.location[i]}</div>
              )
              )
            }
          </div>
        </div>
      </label >

      <div>
        <button
          onClick={(e) => goToModify(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          Modify
        </button>

        <button
          onClick={(e) => goToOk(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          Ok
        </button>
      </div>
    </div >
  )
}

export default confirm
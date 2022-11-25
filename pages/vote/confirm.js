import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { voteSlice } from "../../store/vote";
import axios from "axios";
import { useRouter } from "next/router"

import { useReward } from 'react-rewards';

import { ts_to_date } from "../../lib/util"


function VoteConfirm() {
  const router = useRouter()
  const plan = useSelector((state) => state.plan);
  const vote = useSelector((state) => state.vote);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  function sleep(waitSec, callbackFunc) {

    // 経過時間（秒）
    var spanedSec = 0;

    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {

      spanedSec++;

      // 経過時間 >= 待機時間の場合、待機終了。
      if (spanedSec >= waitSec) {

        // タイマー停止
        clearInterval(id);

        // 完了時、コールバック関数を実行
        if (callbackFunc) callbackFunc();
      }
    }, 1000);

  }


  const goToModify = (e) => {
    e.preventDefault();
    dispatch(voteSlice.actions.reset())
    dispatch(voteSlice.actions.setPlanId(plan.id));
    dispatch(voteSlice.actions.setVoterId(user.id));
    router.push(`/vote/${plan.id}`);
  };

  const goToOk = async (e) => {
    reward()
    e.preventDefault();

    sleep(1, async function () {
      const res = await axios.post("/api/plans/vote", {
        voter_id: vote.voter_id,
        plan_id: vote.plan_id,
        location: vote.location,
        venue: vote.venue,
        date: vote.date,
        time: vote.time,
      })

      router.push(`/nomi/${vote.plan_id}`);

    })
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
          内容確認
        </span>
        <div className="mx-2 flex flex-col">
          <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">飲み会名: <div className="text-sm text-slate-600">{plan.name}</div></div>
          <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">日時 Vote:
            {
              vote.date &&
              <span className="text-sm text-slate-600">{Object.keys(vote.date).map((el) => (<div className={vote.date[el] ? `` : `line-through`}>{ts_to_date(Number(el))}</div>))}</span>
            }
          </div>
          <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">時刻 Vote:
            {
              vote.time &&
              <span className="text-sm text-slate-600">{Object.keys(vote.time).map((el) => (<div className={vote.time[el] ? `` : `line-through`}>{el}</div>))}</span>
            }
          </div>
          <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">場所 Vote:
            {
              vote.location &&
              <span className="text-sm text-slate-600"></span>
            }
            <span className="text-sm text-slate-600">
              {
                (() => {
                  if (vote.location) {
                    return Object.keys(vote.location).map((el, i) => {
                      if (el !== "null") {
                        return (
                          <div className={vote.location[el] ? `` : `line-through`}>{el}</div>
                        )
                      }
                    }
                    )

                  }

                })()
              }
            </span>
          </div>

          <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">お店 Vote:
            {
              (() => {
                if (vote.venue) {
                  return Object.keys(vote.venue).map((location) => {
                    return Object.keys(vote.venue[location]).map((link) => {

                      if (vote.venue[location][link]) {
                        return (
                          <div>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600">{link}</a>
                          </div>
                        )
                      }
                    })
                  })

                }
              })()
            }
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
          disabled={isAnimating}
          onClick={(e) => goToOk(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          OK
        </button>
        <span id="rewardId" />
      </div>
    </div >
  )
}

export default VoteConfirm
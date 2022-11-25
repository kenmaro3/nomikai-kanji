import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function Time() {

    const dispatch = useDispatch()
    const router = useRouter()

    const time_list = [
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
    ];

    const [time, setTime] = useState([])

    const selectHandler = (e, index) => {
        if (time.length < 2) {
            let tmp = [...time, e.target.value]
            const set = new Set()
            tmp.map(item => set.add(item))
            const tmp2 = Array.from(set)
            setTime(tmp2)
            dispatch(nomiSlice.actions.setTime({ time: tmp2 }))
        }
        else {
            let tmp = [...time]
            tmp[index] = e.target.value
            const set = new Set()
            tmp.map(item => set.add(item))
            const tmp2 = Array.from(set)
            setTime(tmp2)
            dispatch(nomiSlice.actions.setTime({ time: tmp2 }))

        }
    }

    const goNext = (e) => {

        e.preventDefault()
        if (time.length == 0) {
            return
        }
        router.push("/nomi/location")
    }


    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <label className="block">
                <span className="block text-lg font-medium text-slate-700">
                    ⏰ ノミカイ時間
                </span>
                <label
                    for="default"
                    className="mt-3 block mb-2 text-sm font-medium text-gray-900"
                >
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 ">
                        第一候補🥇
                    </span>
                </label>
                <select
                    id="default"
                    name="time_selector"
                    onChange={(e) => selectHandler(e, 0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                    <option selected>None</option>
                    {time_list.map((time) => {
                        return (
                            <option value={time}>{time}</option>
                        )
                    })}
                </select>

                <label
                    for="default"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    第二候補🥈 (オプショナル)
                </label>
                <select
                    id="default"
                    name="time_selector"
                    onChange={(e) => selectHandler(e, 1)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                    <option selected>None</option>
                    {time_list.map((time) => {
                        return (
                            <option value={time}>{time}</option>
                        )
                    })}
                </select>
            </label>

            <button
                onClick={(e) => goNext(e)}
                className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
            >
                Next
            </button>
        </div>
    )
}

export default Time
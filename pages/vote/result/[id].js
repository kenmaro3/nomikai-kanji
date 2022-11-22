import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";

import { ts_to_date } from "../../../lib/util"



function VoteResult() {
    const router = useRouter()
    const plan = useSelector((state) => state.plan);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = router.query

    const [count, setCount] = useState()
    const [date, setDate] = useState({})
    const [location, setLocation] = useState({})
    const [venue, setVenue] = useState({})



    useEffect(() => {

        (async () => {
            const res = await axios.get(`/api/plans/vote/result/${id}`)
            console.log("here")
            console.log(res.data)
            setCount(res.data.datas.count)
            setDate(res.data.datas.date)
            setLocation(res.data.datas.location)
            setVenue(res.data.datas.venue)
        })()


    }, [])



    return (
        <div className="flex flex-col h-screen items-center justify-center">

            <div className="flex flex-col items-center space-x-3">
                {/* <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg> */}
                <h3 className="group-hover:text-white">🐱投票結果</h3>
                <h3 className="text-slate-900 group-hover:text-white text-lg font-bold pt-2">{plan?.name}</h3>
            </div>
            <p className="text-slate-500 group-hover:text-white text-sm">Host: {plan?.host}</p>

            <div className='mt-3 flex flex-col items-center'>
                <div>投票数: {count}</div>

                {
                    Object.keys(date).map((key) => (
                        <div>{ts_to_date(Number(key))} : {date[key]}</div>
                    ))
                }
                {
                    Object.keys(location).map((key) => (
                        <div>{key} : {location[key]}</div>
                    ))
                }
                {
                    Object.keys(venue).map((key) => (
                        <div>{key} : {venue[key]}</div>
                    ))
                }


            </div>
            {/* <div>日時: {date}</div>
            <div>投票数: {count}</div>
            <div>投票数: {count}</div> */}

        </div>
    )
}

export default VoteResult
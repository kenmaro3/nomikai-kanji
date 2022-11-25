import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";

import { ts_to_date } from "../../../lib/util"

import Image from 'next/image'


function VoteResult() {
    const router = useRouter()
    const plan = useSelector((state) => state.plan);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = router.query

    const [count, setCount] = useState()
    const [date, setDate] = useState({})
    const [time, setTime] = useState({})
    const [location, setLocation] = useState({})
    const [venue, setVenue] = useState({})

    const [dateUrl, setDateUrl] = useState({})
    const [timeUrl, setTimeUrl] = useState({})
    const [locationUrl, setLocationUrl] = useState({})
    const [venueUrl, setVenueUrl] = useState({})



    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/plans/vote/result/${id}`)
            console.log(res.data)
            setCount(res.data.count)
            setDate(res.data.date)
            setTime(res.data.time)
            setLocation(res.data.location)
            setVenue(res.data.venue)

            setDateUrl(res.data.date_url)
            setTimeUrl(res.data.time_url)
            setLocationUrl(res.data.location_url)
            setVenueUrl(res.data.venue_url)
        })()

    }, [id])

    const goBack = (e) => {
        e.preventDefault()
        router.push(`/nomi/${id}`)
    }

    function truncate(x, limit) {
        if (x.length <= limit) {
            return x
        }
        else {
            return x.slice(0, limit) + "..."
        }
    }



    return (
        <div className="flex flex-col h-screen items-center justify-center">

            <div className="flex flex-col items-center space-x-3">
                {/* <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg> */}
                <h3 className="group-hover:text-white">🐱投票結果</h3>
                <h3 className="text-slate-900 group-hover:text-white text-lg font-bold pt-2">{plan?.name}</h3>
            </div>
            {/* <p className="text-slate-500 group-hover:text-white text-sm">Host: {plan?.host_id}</p> */}

            <div className='mt-4 flex flex-col items-center'>
                <div><span className='text-slate-700 text-md'>投票数</span> <span className='bg-slate-400 px-2 py-1 rounded-full text-white ml-1'>{count}</span></div>
                <div className='flex flex-col mt-4 border-black px-3 py-2 justify-center items-center'>
                    <div className='py-2'>
                        {
                            (() => {
                                return (
                                    Object.keys(date).map((key) => (
                                        <div className='flex flex-row items-center justify-center'>
                                            <div className='text-slate-700 text-sm my-1'>{ts_to_date(Number(key))} <span className='bg-slate-400 px-2 py-1 rounded-full text-white ml-1'>{date[key]}</span></div>
                                            {
                                                dateUrl[key] &&
                                                dateUrl[key].map((url) => (
                                                    <div className="ml-1 -mr-3 p-2 flex items-center justify-center border-slate border-zinc-300 rounded">
                                                        <Image
                                                            width="30"
                                                            height="30"
                                                            src={url}
                                                            className="rounded-full "
                                                            alt=""
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                )

                            })()
                        }
                        {
                        }
                    </div>

                    <div className='py-2'>
                        {
                            (() => {
                                return (
                                    Object.keys(time).map((key) => (
                                        <div className='flex flex-row items-center justify-center'>
                                            <div className='text-slate-700 text-sm my-1'>{key} <span className='bg-slate-400 px-2 py-1 rounded-full text-white ml-1'>{time[key]}</span></div>
                                            {
                                                timeUrl[key] &&
                                                timeUrl[key].map((url) => (
                                                    <div className="ml-1 -mr-3 p-2 flex items-center justify-center border-slate border-zinc-300 rounded">
                                                        <Image
                                                            width="30"
                                                            height="30"
                                                            src={url}
                                                            className="rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                )

                            })()
                        }
                    </div>

                    <div className='py-2'>
                        {
                            (() => {
                                return (
                                    Object.keys(location).map((key) => (
                                        <div className='flex flex-row items-center justify-center'>
                                            <div className='text-slate-700 text-sm my-1'>{key} <span className='bg-slate-400 px-2 py-1 rounded-full text-white ml-1'>{location[key]}</span></div>
                                            {
                                                locationUrl[key] &&
                                                locationUrl[key].map((url) => (
                                                    <div className="ml-1 -mr-3 p-2 flex items-center justify-center border-slate border-zinc-300 rounded">
                                                        <Image
                                                            width="30"
                                                            height="30"
                                                            src={url}
                                                            className="rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                )

                            })()
                        }
                    </div>

                    <div className='py-2'>
                        {
                            (() => {
                                return (
                                    Object.keys(venue).map((key) => (
                                        <div className='flex flex-row items-center justify-center'>
                                            <div className='text-slate-700 text-sm my-1'>{truncate(key, 32)} <a href={venue[key]} target="_blank" rel="noopener noreferrer" className='bg-slate-400 px-2 py-1 rounded-full text-white ml-1'>{venue[key]}</a></div>
                                            {
                                                venueUrl[key] &&
                                                venueUrl[key].map((url) => (
                                                    <div className="ml-1 -mr-3 p-2 flex items-center justify-center border-slate border-zinc-300 rounded">
                                                        <Image
                                                            width="30"
                                                            height="30"
                                                            src={url}
                                                            className="rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                )

                            })()
                        }

                    </div>

                </div>



            </div>
            <button
                onClick={(e) => goBack(e)}
                className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
            >
                戻る
            </button>
            {/* <div>日時: {date}</div>
            <div>投票数: {count}</div>
            <div>投票数: {count}</div> */}

        </div>
    )
}

export default VoteResult
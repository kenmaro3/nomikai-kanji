import React from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { planSlice } from "../../store/plan"

import { ts_to_date } from "../../lib/util"
import { voteSlice } from '../../store/vote';

import Header from '../../components/header';


function NomiElement() {

    const plan = useSelector((state) => state.plan);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false)
    const [passcode, setPasscode] = useState()
    const [error, setError] = useState(false)

    const [isClickable, setIsClickable] = useState(false)

    const [type, setType] = useState("vote")

    const router = useRouter()
    const { id } = router.query

    const goToPasscode = e => {
        if (!isClickable) {
            getPlan()
            return
        }
        setType("vote")
        setModal(true)
    }
    const goToPasscodeForResult = e => {
        if (!isClickable) {
            getPlan()
            return
        }
        setType("result")
        setModal(true)
    }

    const goToPasscodeForDelete = e => {
        if (!isClickable) {
            getPlan()
            return
        }
        setType("delete")
        setModal(true)
    }

    const closeModal = e => {
        setModal(false)

    }

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value)

    }

    const matchPasscode = async (e) => {
        e.preventDefault()
        setError(false)

        if (passcode !== undefined) {
            const res = await axios.post(`/api/plans/${id}`, {
                passcode: passcode,
            })

            const data = res.data
            if (data.res === "good") {
                dispatch(voteSlice.actions.setPlanId(id))
                dispatch(voteSlice.actions.setVoterId(user.id))
                router.push(`/vote/${id}`)
                setIsClickable(true)
                setError(false)
            }
            else {
                setError(true)
            }
        }
        else {
            return
        }
    }

    const matchPasscodeForResult = async (e) => {
        e.preventDefault()
        setError(false)

        if (passcode !== undefined) {
            const res = await axios.post(`/api/plans/${id}`, {
                passcode: passcode,
            })

            const data = res.data
            if (data.res === "good") {
                router.push(`/vote/result/${id}`)
                setError(false)
            }
            else {
                setError(true)
            }
        }
        else {
            return
        }
    }

    const matchPasscodeForDelete = async (e) => {
        e.preventDefault()
        setError(false)

        if (passcode !== undefined) {
            const res = await axios.post(`/api/plans/delete/${id}`, {
                passcode: passcode,
                user_id: user.id
            })

            const data = res.data
            if (data.res === "good") {
                router.push(`/`)
                setError(false)
            }
            else {
                setError(true)
            }
        }
        else {
            return
        }
    }

    const getPlan = async () => {
        if (id !== undefined) {
            const res = await axios.get(`/api/plans/${id}`)
            if (res.data.datas !== undefined) {
                let tmp = { ...res.data.datas }
                tmp["host_id"] = id

                dispatch(planSlice.actions.set(tmp))
            }
            else {
                router.push("/")

            }

        }

    }

    useEffect(() => {
        getPlan()
    }, [])

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Header />
            {modal ?
                <div className="relative w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={(e) => closeModal(e)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">回答パスコードの入力</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">カンジ から送信されたパスコードを入力してください。</label>
                                    <input value={passcode} onChange={handlePasscodeChange} type="text" name="passcode" id="passcode" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                {error &&
                                    <label for="text" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">Invalid passcode</label>
                                }
                                {
                                    (() => {
                                        if (type == "vote") {
                                            return (
                                                <button onClick={(e) => matchPasscode(e)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">送信</button>
                                            )
                                        }
                                        else if (type == "result") {
                                            return (
                                                <button onClick={(e) => matchPasscodeForResult(e)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">送信</button>
                                            )

                                        }
                                        else if (type == "delete") {
                                            return (
                                                <button onClick={(e) => matchPasscodeForDelete(e)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">送信</button>
                                            )

                                        }

                                    })()
                                }
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div className="flex flex-col ">
                    <a onClick={(e) => goToPasscode(e)} className="group block max-w-xs my-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
                        <div className="flex flex-col items-center space-x-3">
                            <h3 className="group-hover:text-white">📆 日時 📍 開催場所投票はコチラ</h3>
                            <h3 className="text-slate-900 group-hover:text-white text-lg font-bold pt-2">{plan?.name}</h3>
                        </div>
                        <p className="text-slate-500 group-hover:text-white text-sm">カンジ: {plan?.host_id}</p>
                        <p className="text-slate-500 group-hover:text-white text-sm">回答締め切り: {ts_to_date(plan?.deadline)}</p>
                    </a>

                    <a onClick={(e) => goToPasscodeForResult(e)} className="group block max-w-xs my-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
                        <div className="flex flex-col items-center space-x-3">
                            <h3 className="group-hover:text-white">🐱投票結果を見る</h3>
                        </div>
                    </a>

                    <a onClick={(e) => goToPasscodeForDelete(e)} className="group block max-w-xs my-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
                        <div className="flex flex-col items-center space-x-3">
                            <h3 className="group-hover:text-white">🗑投稿を削除する</h3>
                        </div>
                        <p className="text-slate-500 group-hover:text-white text-sm text-center">カンジ のみ削除可能</p>
                    </a>

                </div>
            }
        </div>
    )
}

export default NomiElement
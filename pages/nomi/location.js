import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function NomiLocation() {
  const location_list = [
    "新宿駅",
    "東京駅",
    "渋谷駅",
    "池袋駅",
    "品川駅",
    "新橋駅",
    "目黒駅",
  ];

  const [location1, setLocation1] = useState();
  const [location2, setLocation2] = useState();

  const router = useRouter()

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocation1(nomi.location[0])
    setLocation2(nomi.location[1])

  }, [])


  const goNext = (e) => {
    if (location1 === undefined && location2 === undefined) {
      return
    }
    e.preventDefault();
    router.push("/nomi/venue");
  };

  const selectHandler1 = (e) => {
    setLocation1(e.target.value)
    dispatch(nomiSlice.actions.setLocation({ location: [e.target.value, location2] }))
  };

  const selectHandler2 = (e) => {
    setLocation2(e.target.value)
    dispatch(nomiSlice.actions.setLocation({ location: [location1, e.target.value] }))
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="block text-lg font-medium text-slate-700">
          📍 ノミカイ場所
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
          name={location1}
          onChange={(e) => selectHandler1(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected>None</option>
          {location_list.map((location) => {
            if (location === location1) {
              return (
                <option selected value={location}>{location}</option>
              )
            }
            else {
              return (
                <option value={location}>{location}</option>
              )
            }
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
          name={location2}
          onChange={(e) => selectHandler2(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected>None</option>
          {location_list.map((location) => {
            if (location === location2) {
              return (
                <option selected value={location}>{location}</option>
              )
            }
            else {
              return (
                <option value={location}>{location}</option>
              )
            }
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
  );
}

export default NomiLocation;

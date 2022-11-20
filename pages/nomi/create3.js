import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import Router from "next/router";

function CreateNomi3() {
  const location_list = [
    "新宿駅",
    "東京駅",
    "渋谷駅",
    "池袋駅",
    "品川駅",
    "新橋駅",
    "目黒駅",
  ];

  const [location, setLocation] = useState([]);

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();


  useEffect(() => {
    setLocation(nomi.location)
  }, [nomi]);


  const goToStep4 = (e) => {
    dispatch(nomiSlice.actions.setLocation({ location: location }));
    e.preventDefault();
    //Router.push("/nomi/create4");
    Router.push("/nomi/create5");
  };

  const selectHandler = (e) => {
    setLocation([...location, e.target.value]);
  };


  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Nomi Locations
        </span>
        <label
          for="default"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select first choice location
        </label>
        <select
          id="default"
          onChange={(e) => selectHandler(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a location</option>
          {location_list.map((location) => (
            <option value={location}>{location}</option>
          ))}
        </select>

        <label
          for="default"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select second choice location
        </label>
        <select
          id="default"
          onChange={(e) => selectHandler(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a location</option>
          {location_list.map((location) => (
            <option value={location}>{location}</option>
          ))}
        </select>
      </label>

      <button
        onClick={(e) => goToStep4(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
      >
        Next
      </button>
    </div>
  );
}

export default CreateNomi3;

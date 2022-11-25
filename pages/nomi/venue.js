import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from "next/router"

function NomiVenue() {
  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const router = useRouter()

  const [name, setName] = useState("");
  const [placeVenue, setPlaceVenue] = useState([["", "", ""], ["", "", ""]])

  const [url, setUrl] = useState("")

  useEffect(() => {
    setName(nomi.name)

    nomi.venue.forEach((placeElement, i) => {
      if (nomi.location[i] !== null) {
        for (let j = 0; j < 3; j++) {
          let tmp = [...placeVenue]
          tmp[i][j] = nomi.venue[i][j]
          setPlaceVenue(tmp)
        }
      }
    })
  }, []);


  const handleVenue = (e, placeIndex, venueIndex) => {
    placeVenue[placeIndex][venueIndex] = e.target.value
    dispatch(nomiSlice.actions.setVenueSpecific({
      placeIndex: placeIndex,
      venueIndex: venueIndex,
      value: e.target.value
    }))
  }

  const goNext = (e) => {
    let flag = false
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        if (placeVenue[i][j] !== "") {
          flag = true
          break

        }
      }
    }
    if (!flag) return

    e.preventDefault();
    router.push("/nomi/deadline");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
        🥘 お店候補の入力
      </span>
      <span className="mb-2 text-xs font-medium text-slate-500">
        各場所３つまで
      </span>

      {nomi.location.map((locationElement, i) => {
        if (nomi.location[i] !== null) {
          return (
            <label className="mt-3 block">
              <span className="mb-2 block text-md font-medium text-slate-700">
                {nomi.location[i]}
              </span>

              <input
                type="text"
                className="mb-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="URLの入力..."
                //value={nomi.venue[el][0]}
                value={placeVenue[i][0]}
                onChange={(e) => handleVenue(e, i, 0)}
              />
              <input
                type="text"
                className="mb-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="URLの入力..."
                //value={nomi.venue[el][0]}
                value={placeVenue[i][1]}
                onChange={(e) => handleVenue(e, i, 1)}
              />
              <input
                type="text"
                className="mb-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="URLの入力..."
                //value={nomi.venue[el][0]}
                value={placeVenue[i][2]}
                onChange={(e) => handleVenue(e, i, 2)}
              />
            </label>

          )
        }

      }


      )}


      <button
        onClick={(e) => goNext(e)}
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-4"
      >
        Next
      </button>
    </div>
  );
}

export default NomiVenue;

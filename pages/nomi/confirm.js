import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import Router from "next/router";
import axios from "axios";

import { ts_to_date } from "../lib/util"

function Confirm() {

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState();

  const [modal, setModal] = useState(false)

  const [id, setId] = useState()
  const [passcode, setPasscode] = useState()
  const [shareUrl, setShareUrl] = useState()

  const handleOnChange = (date) => {

    console.log("🚀 ~ file: create2.js ~ line 20 ~ handleOnChange ~ e", date)
    setDeadline(date)

  };

  useEffect(() => {
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      if (liff.ready) {
        liff.permanentLink
          .createUrlBy(`https://localhost:3000/nomi/${id}`)
          .then((permanentLink) => {
            // https://liff.line.me/1234567890-AbcdEfgh
            console.log(permanentLink);
            setShareUrl(permanentLink)
          });


      }

    });


  })

  const goToModify = (e) => {
    e.preventDefault();
    Router.push("/nomi/create1");
  };

  const goToOk = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://localhost:3000/api/plans", {
      name: nomi.name,
      date: nomi.date,
      location: nomi.location,
      deadline: nomi.deadline,
      host_id: nomi.host_id,
    })
    console.log("🚀 ~ file: confirm.js ~ line 31 ~ goToOk ~ res", res)

    setId(res.data.id)
    setPasscode(res.data.passcode)

    setModal(true)

    //Router.push("/nomi/create5");
  };

  const goBackToPlan = (e) => {
    e.preventDefault()
    setModal(false)
    Router.push(`/plans/${res.id}`)
  }

  const sendMessageViaTargetPicker = () => {
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      if (liff.ready) {
        liff.shareTargetPicker(
          [
            {
              type: "text",
              text: "Hello, World!",
            },
          ],
          {
            isMultiple: true,
          }
        )
          .then(function (res) {
            if (res) {
              // succeeded in sending a message through TargetPicker
              console.log(`[${res.status}] Message sent!`)
            } else {
              const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
              if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
                // LINE 10.3.0 - 10.10.0
                // Old LINE will access here regardless of user's action
                console.log('TargetPicker was opened at least. Whether succeeded to send message is unclear')
              } else {
                // LINE 10.11.0 -
                // sending message canceled
                console.log('TargetPicker was closed!')
              }
            }
          }).catch(function (error) {
            // something went wrong before sending a message
            console.log('something wrong happen')
          })
      }

    }

    });
}






return (
  <div className="flex flex-col h-screen justify-center items-center">
    {!modal ?
      <div>
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Confirmation
          </span>
          <div className="flex flex-col">
            <div>name: {nomi.name}</div>
            <div>date:
              {nomi.date?.map((el) => (<div>{ts_to_date(el)}</div>))}

            </div>
            <div>location:
              {nomi.location?.map((el) => (<div>{el}</div>))}
            </div>
            <div>deadline:
              {/* {nomi.deadline?.map((el) => (<div>{ts_to_date(el)}</div>))} */}
              <div>{ts_to_date(nomi.deadline)}</div>

            </div>
            {/* <div>passcode: {nomi.passcode}</div> */}
          </div>
        </label>

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

      </div>
      :
      <div className="relative w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <button onClick={(e) => closeModal(e)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button> */}
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white"></h3>
            <div>share url</div>
            <div>{shareUrl}}</div>

            <div>passcode</div>
            <div>{passcode}</div>
            {/* <form className="space-y-6" action="#">
                <div>
                  <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter passcode</label>
                  <input value={passcode} onChange={handlePasscodeChange} type="text" name="passcode" id="passcode" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button onClick={(e) => goBackToPlan(e)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Back</button>
              </form> */}
            <button onClick={(e) => goBackToPlan(e)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Back</button>
          </div>
        </div>
      </div>
    }
  </div>
);
}

export default Confirm;

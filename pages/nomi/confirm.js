import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { nomiSlice } from "../../store/nomi";
import { useRouter } from 'next/router'
import axios from "axios";
import { useReward } from 'react-rewards';

import { ts_to_date, extract_http_url } from "../../lib/util"

function Confirm() {
  const router = useRouter()

  const nomi = useSelector((state) => state.nomi);
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState();

  const [modal, setModal] = useState(false)

  const [id, setId] = useState()
  const [passcode, setPasscode] = useState()
  const [shareUrl, setShareUrl] = useState()

  const [loading, setLoading] = useState(false);


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

  useEffect(() => {
    setLoading(false)
  }, [])


  useEffect(() => {
    setShareUrl(`${process.env.NEXT_PUBLIC_URL}nomi/${id}`)
  }, id)

  const goToModify = (e) => {
    e.preventDefault();
    router.push("/nomi/name");
  };

  const goToOk = async (e) => {
    reward()
    e.preventDefault();
    sleep(1, async function () {

      setLoading(true)

      const res = await axios.post("/api/plans", {
        name: nomi.name,
        date: nomi.date,
        time: nomi.time,
        location: nomi.location,
        venue: nomi.venue,
        deadline: nomi.deadline,
        host_id: nomi.host_id,
      })

      setId(res.data.id)
      setPasscode(res.data.passcode)

      setLoading(false)
      setModal(true)

    });


    //Router.push("/nomi/create5");
  };

  const goBackToPlan = (e) => {
    e.preventDefault()
    sendMessageViaTargetPicker()
    setModal(false)
    router.push(`/nomi/${id}`)
  }

  const sendMessageViaTargetPicker = () => {
    import("@line/liff").then((liff) => {
      if (liff.ready) {
        if (liff.isApiAvailable("shareTargetPicker")) {
          liff.shareTargetPicker(
            [
              {
                type: "text",
                text: `ノミカイカンジでノミタイカンジ。\nカンジからのご連絡です🍺\n飲み会の開催を計画しています。`,
              },
              {
                type: "text",
                text: `こちらからリンクにアクセスして投票してください。 \n${shareUrl} \nアクセスの際には次のメッセージに記載のパスコードを入力してください。`,
              },
              {
                type: "text",
                text: `${passcode}`,
              },
            ],
            {
              isMultiple: true,
            }
          )
            .then(function (res) {
              if (res) {
                // succeeded in sending a message through TargetPicker
              } else {
                const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
                if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
                  // LINE 10.3.0 - 10.10.0
                  // Old LINE will access here regardless of user's action
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

        } else {
          console.log("api not available")
        }

      } else {

        console.log("liff is not ready")
      }

    });


  }






  return (
    <div>
      {!modal ?
        <div className="flex flex-col h-screen justify-center items-center">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
              内容確認
            </span>
            <div className="mx-2 flex flex-col">
              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">飲み会名: <span className="text-md text-slate-600">{nomi.name}</span></div>
              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">日時:
                <span className="text-sm text-slate-600">{nomi.date?.map((el) => (<div>{ts_to_date(el)}</div>))}</span>
              </div>
              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">時刻:
                <span className="text-sm text-slate-600">{nomi.time?.map((el) => (<div>{el}</div>))}</span>
              </div>
              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">場所:
                <span className="text-sm text-slate-600">{nomi.location?.map((el) => (<div>{el}</div>))}</span>
              </div>
              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">お店候補:
                {
                  nomi.venue.map((placeElement) => (
                    <div>
                      <div>
                        <a href={extract_http_url(placeElement[0])} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600">{placeElement[0]}</a>
                      </div>

                      <div>
                        <a href={extract_http_url(placeElement[1])} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600">{placeElement[1]}</a>
                      </div>

                      <div>
                        <a href={extract_http_url(placeElement[2])} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600">{placeElement[2]}</a>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="border px-2 py-1 rounded mt-1 text-sm font-medium text-slate-800">回答締め切り:
                {/* {nomi.deadline?.map((el) => (<div>{ts_to_date(el)}</div>))} */}
                <div className="text-sm text-slate-600">{ts_to_date(nomi.deadline)}</div>
              </div>

            </div>

            <div className="mr-2 ml-4 flex flex-col">
              {/* <div>passcode: {nomi.passcode}</div> */}
            </div>

          </label>

          <div className="text-center">
            <button
              onClick={(e) => goToModify(e)}
              className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-4 mr-2"
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

        </div>
        :
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 "></h3>
            <div>
              <div className="text-lg text-slate-800">共有リンク</div>
              <div>{shareUrl}</div>
            </div>

            <div className="mt-2">
              <div className="text-lg text-slate-800">パスコード</div>
              <div>{passcode}</div>
            </div>

            <button onClick={(e) => goBackToPlan(e)} type="submit" className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">ラインで共有</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Confirm;

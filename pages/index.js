import Head from "next/head";
import packageJson from "../package.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "store";
import { userSlice } from "../store/user";
import { nomiSlice } from "../store/nomi";

import Header from "../components/header";

export default function Home(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/

  const router = useRouter()

  const [name, setName] = useState()
  const [pictureUrl, setPictureUrl] = useState()
  const [userId, setUserId] = useState()

  const nomi = useSelector((state) => state.nomi)
  const user = useSelector((state) => state.user)

  const [error, setError] = useState(false)


  const dispatch = useDispatch();

  const [plans, setPlans] = useState([])

  const liffStart = () => {
    import("@line/liff").then((liff) => {
      if (liff.ready) {
        liff
          .getProfile()
          .then((profile) => {
            setName(profile.displayName)
            setPictureUrl(profile.pictureUrl)
            setUserId(profile.userId)
            dispatch(userSlice.actions.setName(profile.displayName));
            dispatch(userSlice.actions.setUrl(profile.pictureUrl));
            dispatch(userSlice.actions.setId(profile.userId));
            setError(false)

          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    });
  }

  useEffect(() => {
    // to avoid `window is not defined` error
    liffStart()
  }, []);


  const clickGetUserId = (e) => {
    e.preventDefault()
    liffStart()
  }


  useEffect(() => {
    (async () => {
      if (userId !== undefined) {
        const res = await axios.get(`/api/plans/user/${userId}`)
        const res_data = await res.data
        if (res_data !== undefined) {
          setPlans(res_data.datas)
        }
      }
    })()

  }, [userId])


  const createNomikai = (e) => {
    e.preventDefault();
    dispatch(nomiSlice.actions.reset())
    if (userId === undefined) {
      setError(true)
      return
    }
    else {
      dispatch(nomiSlice.actions.setHostId(userId))

    }
    router.push("/nomi/name");
  };

  return (
    <div>
      <Head>
        <title>ノミカイカンジ</title>
      </Head>

      <div className="flex flex-col h-screen items-center justify-center">
        <Header />

        <div className="my-2 p-2 flex items-center justify-center border-slate border-zinc-300 rounded">
          <img
            width="40"
            height="40"
            //src="https://avatars.dicebear.com/api/male/kenmaro.svg"
            src={pictureUrl}
            className="rounded-full"
            alt=""
          />
          <div className="text-slate-700 text-md ml-2">{name}</div>
        </div>
        <div className="text-center my-2 text-slate-700 text-sm">ノミカイカンジでノミタイカンジ。</div>
        {error &&
          <label for="text" className="block mb-2 text-sm font-medium text-red-900">ユーザー情報を取得してください。</label>
        }
        {
          (() => {
            if (userId === undefined) {
              return (
                <button
                  onClick={(e) => clickGetUserId(e)}
                  className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-2">
                  ユーザーIDの取得
                </button>
              )

            }

          })()
        }
        <button
          onClick={(e) => createNomikai(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs mt-2"
        >
          新規 ノミカイ 作成🍻
        </button>

        <div className="mt-4 p-2 flex flex-col items-center justify-center">
          <div className="mb-2 font-bold">マイ・ノミカイ</div>
          {
            plans?.map((el) => (
              <Link href={`/nomi/${el.id}`}>
                <div className="mt-1 cursor-pointer shadow-md px-3 py-2 rounded-lg hover:bg-sky-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row">
                      <span className="text-md text-slate-700">ノミカイネーム </span>

                      <span className="text-md text-slate-700 ml-2">{el.data.name}</span>
                    </div>
                    {/* <div>
                      <span className="text-xs text-slate-500">ID</span>
                      <span className="text-xs text-slate-500 ml-2 overflow-hidden">{el.id} </span>
                    </div> */}
                  </div>
                </div>
              </Link>

            ))
          }
        </div>
      </div>
    </div>
  );
}

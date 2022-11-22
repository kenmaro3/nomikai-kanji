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

  const nomi = useSelector((state) => state.nomi)
  const user = useSelector((state) => state.user)


  const dispatch = useDispatch();

  const [plans, setPlans] = useState([])

  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      if (liff.ready) {
        liff
          .getProfile()
          .then((profile) => {
            setName(profile.displayName)
            console.log("🚀 ~ file: index.js ~ line 46 ~ .then ~ profile", profile)
            setPictureUrl(profile.pictureUrl)
            dispatch(userSlice.actions.setName(profile.displayName));
            dispatch(userSlice.actions.setUrl(profile.pictureUrl));
            dispatch(userSlice.actions.setId(profile.userId));

          })
          .catch((err) => {
            console.log("error", err);
          });


      }

    });
  }, []);

  useEffect(() => {
    (async () => {
      //const res = await axios.get("https://localhost:3000/api/plans")
      const res = await axios.get("/api/plans")
      const res_data = await res.data
      console.log("🚀 ~ file: index.js ~ line 58 ~ res", res_data)
      if (res_data !== undefined) {
        setPlans(res_data.datas)
      }

    })()
  }, []);

  const createNomikai = (e) => {
    e.preventDefault();
    dispatch(nomiSlice.actions.reset())
    dispatch(nomiSlice.actions.setHostId(user.id))
    router.push("/nomi/name");
  };

  return (
    <div>
      <Head>
        <title>Nomikai Starter</title>
      </Head>

      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-xl font-bold px-3 py-2 shadow-md mb-3">Nomikai Kanji</h1>

        <div className="my-2 p-2 flex items-center justify-center border border-zinc-300 rounded">
          <img
            width="40"
            height="40"
            //src="https://avatars.dicebear.com/api/male/kenmaro.svg"
            src={pictureUrl}
            alt=""
          />
          <div>{name}</div>
        </div>
        <button
          onClick={(e) => createNomikai(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          新規 Nomikai 作成🍻
        </button>

        <div className="p-2 flex flex-col items-center justify-center">
          <div className="p-4 border border-black rounded">
            {
              plans?.map((el) => (
                <Link href={`/nomi/${el.id}`}>
                  <div>
                    <div className="flex flex-col">
                      <div>{el.id}</div>
                      <h2>{el.name}</h2>
                    </div>
                    <div className="flex flex-row px-4 py-2">
                      <img
                        className="p-1 border rounded-full border-black"
                        width="40"
                        height="40"
                        src="https://avatars.dicebear.com/api/male/kento.svg"
                        alt=""
                      />
                      <img
                        className="p-1 border rounded-full border-black"
                        width="40"
                        height="40"
                        src="https://avatars.dicebear.com/api/male/takei.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </Link>

              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

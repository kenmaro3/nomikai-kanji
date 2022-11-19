import Head from "next/head";
import packageJson from "../package.json";
import { useState, useEffect } from "react";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "store";
import { nomiSlice } from "../store/nomi";

export default function Home(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/

  const dispatch = useDispatch();
  const nomi = useSelector((state) => state.nomi);

  useEffect(() => {
    console.log("nomi", nomi);
  }, []);

  const createNomikai = (e) => {
    e.preventDefault();
    Router.push("/nomi/create1");
  };

  return (
    <div>
      <Head>
        <title>Nomikai Starter</title>
      </Head>

      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to Nomikai Starter</h1>

        <div className="my-2 p-2 flex items-center justify-center border border-zinc-300 rounded">
          <img
            width="40"
            height="40"
            src="https://avatars.dicebear.com/api/male/kenmaro.svg"
            alt=""
          />
        </div>
        <button
          onClick={(e) => createNomikai(e)}
          className="bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded text-white max-w-xs"
        >
          Create New Nomikai
        </button>

        <div className="p-2 flex flex-col items-center justify-center">
          <div className="p-4 border border-black rounded">
            <div className="">
              <h2>nomikai 1</h2>
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
        </div>
      </div>
    </div>
  );
}

"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";
import Link from "next/link";
export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  if (status === "loading") {
    return <>
      <div className="w-full mt-64 h-full flex justify-center items-center">
        <Loader />
      </div>
    </>
  }
  return (
    <>
      <div className="flex gap-4 justify-center  flex-col  items-center h-[44vh] px-5 md:px-0 text-lg md:text-base">
        <div className="font-bold md:gap-20 gap-2 md:text-5xl flex justify-center items-center  ">
          Buy me a Coffee
          <span>
            <img src="/tea.gif" className="invert" alt="teagif" width={65} />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and
          followers.
        </p>
        <div className="flex gap-4">
          <button onClick={() => {
            router.push("/login")
          }} className="bg-gray-950 cursor-pointer text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Start Here
          </button>
          <Link href={"/about"}>
            <button className="bg-gray-950 cursor-pointer text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Read more
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="container mx-auto pb-10 px-10">
        <h1 className="text-2xl font-bold text-center my-14 mt-10">
          Your fans can buy you a Coffee
        </h1>
        <div className="flex justify-around gap-5 ">
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img
              width={80}
              className="bg-slate-400 rounded-full p-2  "
              src="/man.gif"
              alt="mangif"
            />
            <p className="font-bold text-center">Fund yourself</p>
            <p className="text-center">Your fan are available for you</p>
          </div>
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img
              width={80}
              className="bg-slate-400 rounded-full p-2  "
              src="/coin.gif"
              alt="coingif"
            />
            <p className="font-bold text-center">Fund yourself</p>
            <p className="text-center">Your fan are available for you</p>
          </div>
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img
              width={80}
              className="bg-slate-400 rounded-full p-2  "
              src="/group.gif"
              alt="groupgif"
            />
            <p className="font-bold text-center">Fund yourself</p>
            <p className="text-center">Your fan are available for you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="container mx-auto pb-10">
        <h2 className="text-2xl font-bold text-center my-12">
          Learn more about us
        </h2>
        <div className="flex justify-center items-center">
          {/* <iframe
            className="rounded-xl"
            width={720}
            height={350}
            src="https://www.youtube.com/embed/vrPV9BqbdKc?si=___Brp4JiDBms2fb"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
        </div>
      </div>
    </>
  );
}

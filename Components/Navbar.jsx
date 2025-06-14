"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showdropdown, setshowdropdown] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter()

  // for dropdown box, making a reference
  const dropdownRef = useRef(null);
  // for button which open dropdown, making a reference
  const buttonRef = useRef(null);

  // this runs when we click outside dropdown, to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setshowdropdown(false);
      }
    };

    // add event listener when dropdown is open
    if (showdropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // remove event listener when dropdown is closed or component removed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showdropdown]); // this useEffect will run again when dropdown state change

  return (
    <nav className="bg-slate-900 flex justify-between px-4 h-18 items-center text-white">
      <div className="">
        <Link
          className="logo font-bold flex justify-center items-center text-lg"
          href={"/"}
        >
          <span>GetMeACoffee</span>
          <span>
            <img width={40} src="/tea.gif" className="invert" alt="teagif" />
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2">
        {session && (
          <>
            <button
              ref={buttonRef}
              onClick={() => {
                setshowdropdown(!showdropdown);
              }}
              id="dropdownDelayButton"
              // this button opens/closes dropdown
              className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              ref={dropdownRef}
              id="dropdownDelay"
              className={`z-10 ${showdropdown ? "" : "hidden"
                } absolute top-[60px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDelayButton"
              >
                <li>
                  <Link
                    href={"/dashboard"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setshowdropdown(false)} // when clicked, close dropdown
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setshowdropdown(false)} // close dropdown after click
                  >
                    Your profile
                  </Link>
                </li>

                <li
                  onClick={() => {
                    signOut();

                    setshowdropdown(false); // close dropdown after logout
                    toast("Login to help your Creators!")
                    router.push("/")
                  }}
                >
                  <p className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Sign out
                  </p>
                </li>
              </ul>
            </div>
          </>
        )}
        {session && (
          // another logout button outside dropdown
          <button
            onClick={() => {
              signOut()
              toast("Login to help your Creators!")
              router.push("/")
            }
            }
            className="bg-gray-950 cursor-pointer text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            logout
          </button>
        )}
        {!session && (
          // if user not logged in, show login button
          <Link href={"/login"}>
            <button className="bg-gray-950 cursor-pointer text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav >
  );
};

export default Navbar;

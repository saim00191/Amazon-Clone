"use client";
import amazonlogo from "@/images/logo.jpg";
import Image from "next/image";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { IoLocationOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { setSignOut, setUserInfo } from "@/redux/Slice"; // Import setUserInfo to save user data
import { BiCart } from "react-icons/bi";
import showAllList from "./ListItems";
import BottomHeader from "../BottomHeader/BottomHeader";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { app } from "@/firebse.config";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {RootState} from "@/redux/store"

const UpperHeader = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [showList, setShowList] = useState<boolean>(false);
  const products = useSelector((state:RootState) => state.amazonReducer.products);
  const userInfo = useSelector((state:RootState) => state.amazonReducer.userInformation);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, dispatch user info to Redux
        dispatch(setUserInfo({
          name: user.displayName, // Assuming displayName is available
          email: user.email,
        }));
      } else {
        // User is signed out, clear user info from Redux
        dispatch(setSignOut()); 
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, auth]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setSignOut()); // Clear user info on sign out
      })
      .catch(() => {
        console.log("An error occurred while signing out");
      });
  };

  return (
    <>
      <div className="w-full px-4 py-3 gap-2 bg-amazonBlue text-white flex items-center justify-between">
        {/* Image */}
        <Link href="/">
          <div className="px-2 py-1 h-[80%] flex items-center cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            <Image src={amazonlogo} className="w-24" alt="Amazon Logo" />
          </div>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex items-center">
          <div className="px-2 py-1 h-[80%] flex items-center cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            <IoLocationOutline className="text-white font-bold text-[22px] mt-2" />
            <span className="text-sm text-lightText flex flex-col ml-2">
              Deliver To
              <span className="-mt-1 font-bold text-[18px] text-white">
                Pakistan
              </span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="h-10 rounded-md flex-grow relative z-40 hidden lgl:flex">
          <span
            onClick={() => setShowList(!showList)}
            className="flex items-center bg-gray-200 h-full w-14 justify-center rounded-tl-md rounded-bl-md text-amazonBlue cursor-pointer"
          >
            All{" "}
            <span>
              <IoMdArrowDropdown />
            </span>
          </span>
          {showList && (
            <div>
              <ul className="absolute overflow-y-scroll duration-700 w-56 h-96 top-12 left-0 flex overflow-x-hidden flex-col p-2 bg-white shadow-gray-400 shadow-md border-amazonBlue text-black">
                <li>
                  {showAllList.map((list, i) => (
                    <li
                      key={i}
                      className="py-1 px-4 cursor-pointer hover:bg-gray-500 text-sm hover:rounded-sm hover:text-white transition duration-100"
                    >
                      {list}
                    </li>
                  ))}
                </li>
              </ul>
            </div>
          )}
          <input
            type="text"
            className="h-full flex-grow outline-none border-none text-amazonBlue px-2"
          />
          <span className="h-full w-12 flex items-center justify-center rounded-tr-md rounded-br-md cursor-pointer bg-amazonYellow hover:bg-[#F3A847]">
            <IoIosSearch className="text-2xl text-black font-semibold" />
          </span>
        </div>

        {/* Sign in */}
        <Link href={"/singin"}>
          <div className="flex flex-col items-start justify-center px-2 py-1 h-[80%] cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            {userInfo && userInfo.name
              ? userInfo.name
              : "Hello, sign in"}
            <p className="hidden sml:flex font-bold text-white -mt-1 text-[17px] items-center gap-[2px]">
              Accounts & List{" "}
              <span>
                <IoMdArrowDropdown />
              </span>
            </p>
          </div>
        </Link>

        {/* Returns */}
        <div className="hidden mdl:flex items-center">
          <div className="px-2 py-1 h-[80%] cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            <p>Returns</p>
            <p className="text-[17px] font-bold text-white -mt-1">& Orders</p>
          </div>
        </div>

        {/* Cart */}
        <Link href="/cart">
          <div className="flex items-center justify-center relative px-2 h-[80%] cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            <BiCart className="text-5xl" />
            <p className="text-white font-semibold mt-2">
              Cart{" "}
              <span className="absolute -top-2 right-8 flex items-center justify-center text-white bg-[#f3a847] rounded-full text-[14px] w-8 h-8">
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>

        {/* Logout */}
        {userInfo && userInfo.name && ( // Ensure userInfo has valid data
          <div onClick={logoutHandler} className="flex justify-center items-center relative px-2 py-1 h-[80%] cursor-pointer hover:border-white border-transparent border-2 transition duration-100">
            <IoIosLogOut className="text-4xl" />
            <p className="hidden mdl:inline-flex text-sm font-bold  text-white">
              Log out
            </p>
          </div>
        )}
      </div>
      <BottomHeader />
    </>
  );
};

export default UpperHeader;

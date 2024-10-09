"use client";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import SideNav from "./SideNav";
import { sideNavData, navItems } from "./Items";
import { useSelector } from "react-redux";
import Link from "next/link";

const BottomHeader = () => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const userInfo = useSelector((state) => state.amazonReducer.userInformation);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  }, [sideNavOpen]);

  return (
    <div className="bg-amazonLight flex items-center gap-8 px-4 py-2">
      {/* Hamburger Menu Button */}
      <div
        onClick={() => setSideNavOpen(!sideNavOpen)}
        className="flex items-center px-2 h-[80%] hover:border-white border-transparent border-2 transition duration-100 gap-1 cursor-pointer"
      >
        <GiHamburgerMenu className="text-white text-2xl font-bold" />
        <span className="text-white font-semibold text-xl">All</span>
      </div>

      {/* Nav Items for larger screens */}
      <div className="hidden mdl:flex space-x-5">
        {navItems.map((item, key) => (
          <span
            className="text-white font-semibold cursor-pointer px-2 py-1 h-[80%] hover:border-white border-transparent border-2 transition duration-100"
            key={key}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Side Navigation */}
      {sideNavOpen && (
        <div className="w-full fixed top-0 left-0 h-full bg-opacity-80 bg-amazonBlue z-50">
          <div className="w-full h-full relative">
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              // Updated width for better responsiveness across all devices
              className="w-[80%] sm:w-[300px] md:w-[350px] fixed top-0 left-0 z-50 h-full border border-black bg-white"
            >
              <div className="w-full gap-x-4 bg-amazonLight py-2 px-6 flex items-center">
                <MdAccountCircle className="text-3xl text-white" />
                <h3 className="text-white font-semibold text-xl sm:text-2xl">
                  {userInfo && userInfo.name 
                    ? userInfo.name
                    : <Link href='/singin'><p>Hello, sign in</p></Link>}
                </h3>
              </div>

              {/* Side Navigation Items */}
              {sideNavData.map((item, index) => (
                <SideNav
                  key={index}
                  title={item.title}
                  one={item.options[0]}
                  two={item.options[1]}
                  three={item.options[2]}
                />
              ))}

              {/* Close Button */}
              <span
                onClick={() => setSideNavOpen(false)}
                // Adjusted position of close icon for smaller screens
                className="text-white cursor-pointer flex items-center justify-center ml-3 absolute text-4xl top-2 left-[80%] sm:left-[300px] md:left-[350px]"
              >
                <IoClose />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomHeader;

import React from "react";
import { CiGlobe } from "react-icons/ci";
import logo from "@/images/logo.jpg";
import Image from "next/image";
import USFlag from "@/images/unitedStates.png";

const FooterMiddleBottom = () => {
  return (
    <div className="w-full border-t-[1px] border-gray-400">
      <div className="py-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-10">
        <div className="flex items-center mx-auto space-x-7">
          <Image
            src={logo}
            alt="logo"
            className="w-24 mt-1 cursor-pointer"
          />
          <div className="border border-gray-400 p-2 flex items-center">
            <p className="xs:text-[10px] sm:text-sm flex gap-2 cursor-pointer items-center">
              <span>
                <CiGlobe />
              </span>
              English
            </p>
          </div>
          <div className="border border-gray-400 p-2 flex items-center">
            <p className="xs:text-[10px] sm:text-sm flex gap-0.5 md:gap-2 cursor-pointer">
              <span>$</span>USD-U.S Dollars
            </p>
          </div>
          <div className="border border-gray-400 p-2 hidden md:flex items-center">
            <p className="flex gap-2 cursor-pointer">
              <span>
                <Image src={USFlag} alt="USFlag" className="w-10" />
              </span>
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddleBottom;

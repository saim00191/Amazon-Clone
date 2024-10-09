import React from "react";

const FooterTop = () => {
  return (
    <div className="bg-white relative py-6 w-full">
      <div className="border-t-[1px] w-full border-b-[1px] py-7 border-gray-300">
        <div className="w-64 mx-auto text-center">
          <p className="text-sm">See personalized recommendations</p>
          <button className="w-full bg-yellow-400 py-1 font-semibold text-lg mt-1.5 hover:bg-yellow-500 active:bg-yellow-600 rounded-md">
            Sing In
          </button>
          <p className="text-xs mt-1">
            New customer? <span className="text-green-700 cursor-pointer">Start here.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;

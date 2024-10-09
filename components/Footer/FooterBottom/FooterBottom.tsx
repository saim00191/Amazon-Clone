import React from "react";
import { FooterItems, FooterLinks } from "./FooterItems";

const FooterBottom = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-[#131A22] w-full py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 px-4 gap-y-6 gap-x-2 md:grid-cols-4 lg:grid-cols-7">
          {FooterItems.map((item, index) => (
            <div key={index} className="space-y-1 text-center sm:text-left">
              <h3 className="text-[#ddd] font-semibold text-sm hover:underline">
                {item.title}
              </h3>
              <p className="cursor-pointer text-[12px] text-[#999] leading-4 mt-0.5 hover:underline">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-3 mt-6 md:flex-row md:gap-x-6">
          {FooterLinks.map((item, index) => (
            <div key={index} className="mt-3">
              <p className="text-[#ddd] text-sm cursor-pointer hover:underline">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[#ddd] text-sm text-center">
            © 1996-{year}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;

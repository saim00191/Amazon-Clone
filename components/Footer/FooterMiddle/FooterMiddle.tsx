import React from "react";
import FooterMiddleBottom from "./FooterMiddleBottom";


const FooterMiddle = () => {
  const FooterBottomData = [
    {
      title: "Get to Know Us",
      options: [
        "Careers",
        "Blogs",
        "About Amazon",
        "Investor Relations",
        "Amazon Devices",
        "Amazon Science",
      ],
    },
    {
      title: "Make Money with Us",
      options: [
        "Sell products on Amazon",
        "Sell on Amazon Business",
        "Sell apps on Amazon",
        "Become an Affiliate",
        "Advertise Your Products",
        "Self-Publish with Us",
        "Host an Amazon Hub",
        " ›See More Make Money with Us",
      ],
    },
    {
      title: "Amazon Payment Products",
      options: [
        "Amazon Business Card",
        "Shop with Points",
        "Reload Your Balance",
        "Amazon Currency Converter",
      ],
    },
    {
      title: "Let Us Help You",
      options: [
        "Let Us Help You",
        "Amazon and COVID-19",
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content and Devices Help",
      ],
    },
  ];

  return (
    <>
      <div className="w-full bg-amazonLight text-white">
        <div className="w-full py-8 md:py-6 sm:py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-2">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-start gap-6 sm:gap-4 md:gap-6">
              {FooterBottomData.map((items, index) => (
                <div key={index}>
                  <h3 className="font-title text-xl sm:text-lg font-semibold my-2">
                    {items.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {items.options.map((option, i) => (
                      <li key={i} className="footerLinks text-sm sm:text-xs">
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <FooterMiddleBottom />
      </div>
    </>
  );
  
};

export default FooterMiddle;

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  title: string;
  one: string;
  two: string;
  three: string;
}

const SideNav = ({ title, one, two, three }: Props) => {
  return (
    <div className={`border-b-[1px] border-b-gray-200 py-3 z-40 `}>
      <h3 className="text-lg font-bold px-6 cursor-pointer py-2">{title}</h3>
      <ul>
        <li className="flex items-center justify-between px-6 py-[10px] hover:bg-zinc-200 hover:rounded cursor-pointer text-sm">
          {one}{" "}
          <span>
            <MdKeyboardArrowRight className="text-xl hover:text-black" />
          </span>
        </li>
        <li className="flex items-center justify-between px-6 py-[10px] hover:bg-zinc-200 hover:rounded cursor-pointer text-sm">
          {two}{" "}
          <span>
            <MdKeyboardArrowRight className="text-xl hover:text-black" />
          </span>
        </li>
        <li className="flex items-center justify-between px-6 py-[10px] hover:bg-zinc-200 hover:rounded cursor-pointer text-sm">
          {three}{" "}
          <span>
            <MdKeyboardArrowRight className="text-xl hover:text-black" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;

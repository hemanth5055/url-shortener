import React from "react";
import { IoReloadOutline } from "react-icons/io5";
export default function Loading() {
  return (
    <div className=" flex justify-center items-center">
      <div className="h-[45px] w-[45px] rounded-full  flex justify-center items-center cursor-pointer loading animate-spin">
        <IoReloadOutline className="text-blue-900 font-medium" size={25} />
      </div>
    </div>
  );
}

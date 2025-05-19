import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";

export default function Item({ mainUrl, shortUrl, visits }) {
  const handlecopy = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_LINK}shortUrl`
    );
  };
  return (
    <div className="bg-gray-200 rounded-[15px] max-sm:min-w-[150px] min-w-[250px] p-4 flex gap-2 flex-col">
      <h3 className="text-black font-mont">
        Short Url : {`${import.meta.env.VITE_FRONTEND_LINK}`}
        <span className="bg-violet-200 p-1 break-words">{shortUrl}</span>
      </h3>
      <h3 className="text-black font-mont break-words">Main Url : {mainUrl}</h3>
      <h3 className="text-black font-mont">Visits : {visits / 2}</h3>
      <div className="flex gap-2 justify-end">
        <div className="h-[30px] w-[30px] bg-gray-100 rounded-full cursor-pointer flex justify-center items-center">
          <AiOutlineDelete size={17} />
        </div>
        <div
          className="h-[30px] w-[30px] bg-gray-100 rounded-full cursor-pointer flex justify-center items-center"
          onClick={handlecopy}
        >
          <IoCopyOutline size={17} />
        </div>
      </div>
    </div>
  );
}

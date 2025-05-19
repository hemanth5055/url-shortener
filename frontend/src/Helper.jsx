import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

export default function Helper({ name, user, urls, setUrls }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleGenerate = async () => {
    const urlPattern = /^https:\/\/www\.[a-zA-Z0-9-]+\.(com|in)$/;

    if (urlPattern.test(url)) {
      setLoading(true);
      const data = {
        url: url,
        userId: user._id,
      };
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_SERVER}/url/create`,
          data,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUrls(result.data.urls);
        setUrl("");
      } catch (error) {
        console.error("Error generating URL:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(
        "Enter a valid URL in the format https://www.----.com or https://www.----.in"
      );
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen p-5 flex flex-col max-sm:px-2">
        <div className="w-full flex justify-between px-4 items-center my-3">
          <div>
            <h2 className="text-gray-700 font-medium text-1xl font-mont">
              Welcome Back
            </h2>
            <h1 className="text-black font-medium text-5xl font-garam mt-2">
              {name}
            </h1>
          </div>

          <div className="" onClick={handleLogout}>
            <FiLogOut className="text-black cursor-pointer" size={20} />
          </div>
        </div>
        <div className="mb-[80px] w-full flex flex-col justify-between px-4 items-center mt-[130px] max-sm:mt-[80px] max-sm:mtb[50px]">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder=" Ex : https://www.google.com"
            className="w-[45%] h-[50px] mb-7 max-sm:w-[95%]  bg-gray-200 rounded-[20px] font-mont text-[20px] px-4 outline-none text-black placeholder:text-gray-500 placeholder:font-semibold max-sm:text-[14px]"
          />
          <div className="flex gap-2 items-center">
            <div
              onClick={handleGenerate}
              className="font-mont text-black bg-gray-200 px-[10px] py-[8px] text-[15px] cursor-pointer rounded-[10px]"
            >
              Generate
            </div>
            <div className="w-[40px]  h-[40px] flex justify-center items-center">
              {loading ? <Loading></Loading> : ""}
            </div>
          </div>
        </div>

        <div className="w-full flex-col justify-between px-4 items-center my-3">
          <h1 className="text-black font-medium text-1xl font-mont">
            Your Shortened URL's{" "}
          </h1>
          <div className="w-full mt-7 grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(400px,1fr))] max-sm:grid-cols-1">
            {urls.map((item, index) => {
              return (
                <Item
                  key={index}
                  mainUrl={item.mainUrl}
                  shortUrl={item.shortedUrl}
                  visits={item.visits}
                ></Item>
              );
            })}
            {urls.length <= 0 ? (
              <h1 className="font-mont font-medium text-red-400">
                {"No URL's Shortened"}
              </h1>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Short() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Redirecting");
  const { shortUrl } = useParams();

  useEffect(() => {
    const redirect = async () => {
      if (shortUrl.length > 6) {
        setLoading(false);
        setMessage("Not a Valid short URL");
      } else {
        try {
          const result = await axios.get(
            `${import.meta.env.VITE_SERVER}/url/redirect/${shortUrl}`
          );
          window.location.replace(result.data.redirectto);
        } catch (error) {
          console.error("Error during redirection:", error);
          setLoading(false);
          // Optional: navigate to a 404 or error page
          // navigate("/not-found");
        }
      }
    };
    redirect();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="font-mont font-medium mr-2">{message}</h1>
      {loading && <Loading />}
    </div>
  );
}

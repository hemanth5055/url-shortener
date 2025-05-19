import React, { useEffect, useState } from "react";
import Helper from "./Helper";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER}/dashboard`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setName(result.data.user.name);
        setUrls(result.data.urls);
        setUser(result.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        console.error("Failed to fetch dashboard:", error);
        // optionally handle errors (e.g., redirect, show message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);
  return (
    <div>
      {!loading ? (
        <Helper name={name} user={user} urls={urls} setUrls={setUrls}></Helper>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center font-bold text-2xl mt-5">
        No connections found
      </div>
    );

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-white flex justify-center">
          Connections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {connections.map((conn) => (
            <div
              key={conn._id}
              className="flex flex-col items-center gap-4 p-4 rounded-xl shadow-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              <img
                src={conn.photoUrl}
                alt={`${conn.firstName} ${conn.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <div className="flex flex-col text-center">
                <p className="font-semibold text-lg text-white">
                  {conn.firstName} {conn.lastName}
                </p>
                {conn.about && (
                  <p className="text-sm text-gray-300 mt-1">{conn.about}</p>
                )}
              </div>
              <Link to={"/chat/" + conn._id} ><button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                Chat
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Connections;

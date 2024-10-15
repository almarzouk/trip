import React from "react";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaUtensils,
  FaHotel,
  FaHome,
} from "react-icons/fa";

const TripTimeline = () => {
  const timeline = [
    {
      time: "14:20 , 25th October 2024",
      event: "Arrive at Münster Airport",
      icon: <FaHotel />,
    },
    {
      time: "15:35 , 25th October 2024",
      event: "Flight to Palma",
      icon: <FaPlaneDeparture />,
    },
    {
      time: "18:00 , 25th October 2024",
      event: "Arrive at Palma Airport",
      icon: <FaPlaneArrival />,
    },
    {
      time: "20:00 , 25th October 2024",
      event: "Arrive at Hotel",
      icon: <FaHotel />,
    },
    {
      time: "08:00 - 10:00, 26th October 2024",
      event: "Breakfast",
      icon: <FaUtensils />,
    },
    {
      time: "19:00, 1st November 2024",
      event: "Arrive at Palma Airport",
      icon: <FaPlaneDeparture />,
    },
    {
      time: "21:00, 1st November 2024",
      event: "Arrive at Münster Airport",
      icon: <FaPlaneArrival />,
    },
    {
      time: "22:30, 1st November 2024",
      event: "Arrive Home",
      icon: <FaHome />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
          Trip Itinerary
        </h1>
        <ul className="relative border-l-4 border-purple-500">
          {timeline.map((item, index) => (
            <li key={index} className="mb-10 ml-6">
              <div className="absolute w-8 h-8 bg-purple-500 rounded-full -left-4 flex items-center justify-center">
                <span className="text-white text-lg">{item.icon}</span>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
                <time className="block mb-2 text-sm text-gray-600">
                  {item.time}
                </time>
                <h2 className="text-lg font-semibold text-purple-700">
                  {item.event}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripTimeline;

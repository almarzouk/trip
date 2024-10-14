import React, { useState, useEffect } from "react";

const WelcomePage = () => {
  const [daysUntilFlight, setDaysUntilFlight] = useState(0);
  const [daysUntilReturn, setDaysUntilReturn] = useState(0);

  useEffect(() => {
    const flightDate = new Date("2024-10-25");
    const returnDate = new Date("2024-11-01");
    const today = new Date();

    const flightTimeDiff = flightDate - today; // Difference in milliseconds for departure
    const returnTimeDiff = returnDate - today; // Difference in milliseconds for return

    const daysFlightDiff = Math.ceil(flightTimeDiff / (1000 * 60 * 60 * 24)); // Convert to days for flight
    const daysReturnDiff = Math.ceil(returnTimeDiff / (1000 * 60 * 60 * 24)); // Convert to days for return

    setDaysUntilFlight(daysFlightDiff);
    setDaysUntilReturn(daysReturnDiff);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Palma de Mallorca!
        </h1>
        <p className="text-xl mb-8">Let's Start our Journey Together</p>

        <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
          <p className="text-lg">
            Your flight is on <strong>25/10/2024</strong> and you will return on{" "}
            <strong>01/11/2024</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md w-full sm:w-1/2">
            <h2 className="text-2xl font-bold">Departure</h2>
            <p className="text-4xl font-extrabold mt-4">
              {daysUntilFlight > 0
                ? `${daysUntilFlight} Days`
                : "Your flight is today!"}
            </p>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md w-full sm:w-1/2">
            <h2 className="text-2xl font-bold">Return</h2>
            <p className="text-4xl font-extrabold mt-4">
              {daysUntilReturn > 0
                ? `${daysUntilReturn} Days`
                : "Your return flight is today!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

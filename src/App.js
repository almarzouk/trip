import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ShoppingList from "./pages/ShoppingList";
import TaskList from "./pages/TaskList";
import Weather from "./pages/Weather";
import FileUploads from "./pages/FileUploads";
import TripTimeline from "./pages/TripTimeline";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow bg-gray-800 text-white">
          <TripTimeline />
        </div>
      </div>
    </Router>
  );
};

export default App;

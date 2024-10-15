import { Link } from "react-router-dom";
import { FaShoppingCart, FaTasks, FaCloudSun, FaFilePdf } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 sm:w-48 lg:w-64 bg-gray-900 text-gray-300 h-full">
      <div className="p-4 text-xl text-orange-500 font-bold hidden sm:block">
        Dashboard
      </div>
      <ul className="mt-4">
        <li>
          <Link
            to="/shopping-list"
            className="block py-2 px-2 hover:bg-gray-700 hover:text-orange-500 flex items-center justify-center sm:justify-start"
          >
            <FaShoppingCart className="mr-2 sm:text-base text-sm" />
            <span className="ml-2 hidden sm:inline">Shopping List</span>
          </Link>
        </li>
        <li>
          <Link
            to="/tasks"
            className="block py-2 px-2 hover:bg-gray-700 hover:text-orange-500 flex items-center justify-center sm:justify-start"
          >
            <FaTasks className="mr-2 sm:text-base text-sm" />
            <span className="ml-2 hidden sm:inline">Task List</span>
          </Link>
        </li>
        <li>
          <Link
            to="/weather"
            className="block py-2 px-2 hover:bg-gray-700 hover:text-orange-500 flex items-center justify-center sm:justify-start"
          >
            <FaCloudSun className="mr-2 sm:text-base text-sm" />
            <span className="ml-2 hidden sm:inline">Weather</span>
          </Link>
        </li>
        <li>
          <Link
            to="/files"
            className="block py-2 px-2 hover:bg-gray-700 hover:text-orange-500 flex items-center justify-center sm:justify-start"
          >
            <FaFilePdf className="mr-2 sm:text-base text-sm" />
            <span className="ml-2 hidden sm:inline">Uploaded Files</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

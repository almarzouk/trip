import { Link } from "react-router-dom";
import { FaShoppingCart, FaTasks, FaCloudSun, FaFilePdf } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-gray-300 h-full">
      <div className="p-4 text-xl text-orange-500 font-bold hidden sm:block">
        Dashboard
      </div>
      <ul className="mt-4">
        <li>
          <Link
            to="/shopping-list"
            className="block py-2 px-4 hover:bg-gray-700 hover:text-orange-500 flex items-center"
          >
            <FaShoppingCart className="mr-2" />
            <span className="ml-2 hidden sm:block">Shopping List</span>{" "}
            {/* Hidden on small screens */}
          </Link>
        </li>
        <li>
          <Link
            to="/tasks"
            className="block py-2 px-4 hover:bg-gray-700 hover:text-orange-500 flex items-center"
          >
            <FaTasks className="mr-2" />
            <span className="ml-2 hidden sm:block">Task List</span>{" "}
            {/* Hidden on small screens */}
          </Link>
        </li>
        <li>
          <Link
            to="/weather"
            className="block py-2 px-4 hover:bg-gray-700 hover:text-orange-500 flex items-center"
          >
            <FaCloudSun className="mr-2" />
            <span className="ml-2 hidden sm:block">Weather</span>{" "}
            {/* Hidden on small screens */}
          </Link>
        </li>
        <li>
          <Link
            to="/files"
            className="block py-2 px-4 hover:bg-gray-700 hover:text-orange-500 flex items-center"
          >
            <FaFilePdf className="mr-2" />
            <span className="ml-2 hidden sm:block">Uploaded Files</span>{" "}
            {/* Hidden on small screens */}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";

const FileUploads = () => {
  const [files, setFiles] = useState([]);

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        const response = await axios.post(
          "https://trrip-backend.onrender.com/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(response.data.message);
        fetchFiles(); // Update file list after new upload
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    }
  };

  const handleDownloadFile = async (filename) => {
    try {
      const response = await axios.get(
        `https://trrip-backend.onrender.com/files/${filename}`,
        {
          responseType: "blob", // Indicate that the file is binary data
        }
      );

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file");
    }
  };

  // Fetch files from the API
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "https://trrip-backend.onrender.com/files"
      );
      setFiles(response.data); // Assume response contains a list of files
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Function to remove a file
  const handleRemoveFile = async (filename) => {
    try {
      await axios.delete(
        `https://trrip-backend.onrender.com/files/${filename}`
      );
      fetchFiles(); // Update the list after deletion
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files on component mount
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 sm:p-8">
      <div className="bg-indigo-600 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">
          Uploaded Files
        </h1>

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full max-w-xs sm:max-w-md px-3 py-2 sm:px-4 sm:py-2 text-white bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700 transition duration-200"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg text-white">
            <thead>
              <tr className="bg-white bg-opacity-30">
                <th className="p-2 sm:p-4 text-left">File Name</th>
                <th className="p-2 sm:p-4 text-left">Size (KB)</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white hover:bg-opacity-10 transition duration-200"
                  >
                    <td className="p-2 sm:p-4">{file.name}</td>
                    <td className="p-2 sm:p-4">
                      {(file.size / 1024).toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-4">
                      <button
                        onClick={() => handleDownloadFile(file.name)}
                        className="bg-blue-500 text-white p-1 sm:p-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 mr-1 sm:mr-2"
                      >
                        <FaFileDownload className="text-base sm:text-lg" />
                      </button>
                      <button
                        onClick={() => handleRemoveFile(file.name)}
                        className="bg-red-500 text-white p-1 sm:p-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                      >
                        <MdDelete className="text-base sm:text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-2 sm:p-4 text-white">
                    No files uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FileUploads;

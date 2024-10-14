import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineRemoveDone } from "react-icons/md";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://trrip-backend.onrender.com/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        "https://trrip-backend.onrender.com/tasks",
        {
          task: newTaskTitle,
          isCompleted: false,
          dueDate: null,
        }
      );
      setTasks([...tasks, response.data]);
      setNewTaskTitle(""); // Clear input field
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEdit = async (task) => {
    setEditingTask(task);
    setEditingTaskTitle(task.task); // Set the current task title for editing
  };

  const handleUpdate = async () => {
    if (editingTaskTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }
    try {
      const response = await axios.put(
        `https://trrip-backend.onrender.com/tasks/${editingTask._id}`,
        {
          task: editingTaskTitle,
          isCompleted: editingTask.isCompleted,
        }
      );
      setTasks(
        tasks.map((t) => (t._id === editingTask._id ? response.data : t))
      );
      setEditingTask(null);
      setEditingTaskTitle("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://trrip-backend.onrender.com/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const response = await axios.put(
        `https://trrip-backend.onrender.com/tasks/${task._id}`,
        updatedTask
      );
      setTasks(tasks.map((t) => (t._id === task._id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 p-8">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Task List
        </h1>

        {/* Add New Task Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Add New Task
          </h2>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 shadow-md"
            placeholder="Enter task title"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 w-full"
          >
            Add Task
          </button>
        </div>

        {/* Task List Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white bg-opacity-20 rounded-lg shadow-lg text-white">
            <thead>
              <tr className="bg-white bg-opacity-30">
                <th className="p-4 text-left">Task</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className={`hover:bg-white hover:bg-opacity-10 transition duration-200 ${
                      task.isCompleted ? "bg-green-100 bg-opacity-10" : ""
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`${
                          task.isCompleted
                            ? "line-through text-gray-400"
                            : "text-white"
                        }`}
                      >
                        {task.task}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleCompleted(task)}
                        className={`py-2 px-4 rounded-md shadow-md transition duration-200 ${
                          task.isCompleted
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {task.isCompleted ? (
                          <MdOutlineRemoveDone />
                        ) : (
                          <IoCheckmarkDone />
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow-md mr-2 transition duration-200"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-white">
                    No tasks added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Editing Task Section */}
        {editingTask && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Edit Task</h2>
            <input
              type="text"
              value={editingTaskTitle}
              onChange={(e) => setEditingTaskTitle(e.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 shadow-md"
              placeholder="Edit task title"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 w-full"
            >
              Update Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

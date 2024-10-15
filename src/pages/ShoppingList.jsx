import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState("");
  const [currentItemQuantity, setCurrentItemQuantity] = useState("");

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://trrip-backend.onrender.com/items"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add a new item to the API
  const handleAddItem = async () => {
    if (!newItemName || !newItemQuantity) {
      alert("Please enter both item name and quantity.");
      return;
    }

    const newItem = {
      name: newItemName,
      quantity: parseInt(newItemQuantity),
      isPurchased: false,
    };

    try {
      const response = await axios.post(
        "https://trrip-backend.onrender.com/items",
        newItem
      );
      setItems([...items, response.data]);
      setNewItemName("");
      setNewItemQuantity("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://trrip-backend.onrender.com/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Start editing an item
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItemId(item._id);
    setCurrentItemName(item.name);
    setCurrentItemQuantity(item.quantity);
  };

  // Update an item
  const handleUpdate = async () => {
    const updatedItem = {
      name: currentItemName, // Ensure we're using the current name
      quantity: parseInt(currentItemQuantity),
      isPurchased: false,
    };

    try {
      const response = await axios.put(
        `https://trrip-backend.onrender.com/items/${currentItemId}`,
        updatedItem
      );
      setItems(
        items.map((item) => (item._id === currentItemId ? response.data : item))
      );
      resetEditForm();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Toggle purchased status
  const togglePurchased = async (id) => {
    const itemToUpdate = items.find((item) => item._id === id);
    const updatedItem = {
      ...itemToUpdate,
      isPurchased: !itemToUpdate.isPurchased,
    };

    try {
      const response = await axios.put(
        `https://trrip-backend.onrender.com/items/${id}`,
        updatedItem
      );
      setItems(items.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error("Error updating purchase status:", error);
    }
  };

  // Reset edit form state
  const resetEditForm = () => {
    setIsEditing(false);
    setCurrentItemId(null);
    setCurrentItemName("");
    setCurrentItemQuantity("");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 sm:p-8">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Shopping List
        </h1>

        {/* Add New Item Section */}
        <div className="mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            Add New Item
          </h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
              placeholder="Item Name"
            />
            <input
              type="number"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/4 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
              placeholder="Quantity"
            />
            <button
              onClick={handleAddItem}
              className="bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 transition duration-200"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Shopping List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white bg-opacity-20 text-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Item</th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  Quantity
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-2 px-3 sm:py-3 sm:px-6">{item.name}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6">{item.quantity}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

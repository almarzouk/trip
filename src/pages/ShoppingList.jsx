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
      const response = await axios.get("http://localhost:9000/items");
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
      const response = await axios.post("http://localhost:9000/items", newItem);
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
      await axios.delete(`http://localhost:9000/items/${id}`);
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
        `http://localhost:9000/items/${currentItemId}`,
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
        `http://localhost:9000/items/${id}`,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-8">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">Shopping List</h1>

        {/* Add New Item Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-1/2 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
              placeholder="Item Name"
            />
            <input
              type="number"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-1/4 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
              placeholder="Quantity"
            />
            <button
              onClick={handleAddItem}
              className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Edit Item Section */}
        {isEditing && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                value={currentItemName} // Ensure the input is controlled
                onChange={(e) => setCurrentItemName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-1/2 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
                placeholder="Item Name"
              />
              <input
                type="number"
                value={currentItemQuantity} // Ensure the input is controlled
                onChange={(e) => setCurrentItemQuantity(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-1/4 bg-white bg-opacity-30 placeholder-gray-300 text-gray-800"
                placeholder="Quantity"
              />
              <button
                onClick={handleUpdate} // Call update function
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
              >
                Update Item
              </button>
              <button
                onClick={resetEditForm}
                className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Shopping List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white bg-opacity-20 text-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-6 text-left">Item</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className={`border-b border-gray-300 hover:bg-gray-100 ${
                    item.isPurchased ? "bg-green-100" : ""
                  }`}
                >
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.quantity}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => togglePurchased(item._id)}
                      className={`py-1 px-3 rounded mr-2 transition duration-200 ${
                        item.isPurchased
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {item.isPurchased ? (
                        <MdOutlineRemoveShoppingCart className="text-lg" />
                      ) : (
                        <FiShoppingCart className="text-lg" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded transition duration-200"
                    >
                      <FaRegEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-200"
                    >
                      <RiDeleteBin6Line className="text-lg" />
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

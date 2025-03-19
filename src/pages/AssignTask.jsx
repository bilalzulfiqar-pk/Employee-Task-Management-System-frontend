import React, { useState, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DataContext } from "../context/DataContext";
import Swal from "sweetalert2";


const AssignTask = () => {
  const { data } = useContext(DataContext);
  const employees = data.employees || [];

  const [task, setTask] = useState({
    employee: "",
    title: "",
    date: "",
    priority: "Medium",
    description: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.employee || !task.title || !task.date || !task.description) {
      alert("Please fill in all fields before assigning the task.");
      return;
    }

    // console.log("Task Assigned:", task);

    Swal.fire({
      icon: "success",
      title: "Task Assigned",
      text: "(Code needs to be implemented yet)",
      showConfirmButton: false,
      timer: 1500,
    });

    // Reset form after submission
    setTask({
      employee: "",
      title: "",
      date: "",
      priority: "Medium",
      description: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Assign Task
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Employee Selection */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">
              Employee Name
            </label>
            <select
              name="employee"
              value={task.employee}
              onChange={handleChange}
              className="w-full p-2 pr-9 border cursor-pointer hover:bg-gray-100 focus:bg-gray-100  
                         border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 appearance-none 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-10 pointer-events-none text-gray-500">
              <IoIosArrowDown />
            </span>
          </div>

          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
            />
          </div>

          {/* Priority Selection */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-2 pr-9 border cursor-pointer hover:bg-gray-100 focus:bg-gray-100  
                         border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 appearance-none 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="High" className="text-red-500">High</option>
              <option value="Medium" className="text-yellow-500">Medium</option>
              <option value="Low" className="text-green-500">Low</option>
            </select>
            <span className="absolute right-3 top-10 pointer-events-none text-gray-500">
              <IoIosArrowDown />
            </span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition resize-none h-24"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg font-medium 
                       hover:bg-blue-600 transition-all shadow-md cursor-pointer"
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;

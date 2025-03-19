import React, { useState, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DataContext } from "../context/DataContext";
import Swal from "sweetalert2";

const ModifyEmployee = () => {
  const { data } = useContext(DataContext);
  const employees = data.employees || [];
  const roles = [...new Set(employees.map((emp) => emp.role))]; // Extract unique roles

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeData, setEmployeeData] = useState({ name: "", role: "" });

  const handleSelectChange = (e) => {
    const selected = employees.find((emp) => emp.name === e.target.value);
    setSelectedEmployee(selected?.name || "");
    setEmployeeData({
      name: selected?.name || "",
      role: selected?.role || "",
    });
  };

  const handleRoleChange = (e) => {
    setEmployeeData({ ...employeeData, role: e.target.value });
  };

  const handleDelete = () => {
    // if (window.confirm("Are you sure you want to delete this employee?")) {
    //   // Perform delete action here
    //   console.log("Employee deleted");
    // }

    if (!selectedEmployee) {
      Swal.fire({
        icon: "error",
        title: "No Employee Selected",
        text: "Please select an employee before updating.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Employee Deleted",
          text: "(Code need to implement yet)",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedEmployee("");
        setEmployeeData({ name: "", role: "" });
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      Swal.fire({
        icon: "error",
        title: "No Employee Selected",
        text: "Please select an employee before updating.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Future: Handle update logic when backend is connected
    Swal.fire({
      icon: "success",
      title: "Employee Updated",
      text: "(Code needs to be implemented yet)",
      showConfirmButton: false,
      timer: 1200,
    });

    // console.log("Employee updated:", employeeData);

    setSelectedEmployee("");
    setEmployeeData({ name: "", role: "" });
  };

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Modify Employee
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Select Employee */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">
              Select Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={handleSelectChange}
              className="w-full p-2 pr-9 border cursor-pointer hover:bg-gray-100 focus:bg-gray-100  
                         border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 appearance-none 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="">Choose Employee</option>
              {employees.map((emp) => (
                <option key={emp.name} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-10 pointer-events-none text-gray-500">
              <IoIosArrowDown />
            </span>
          </div>

          {/* Employee Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              readOnly
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700 shadow-sm transition"
            />
          </div>

          {/* Employee Role (Dropdown) */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              value={employeeData.role}
              onChange={handleRoleChange}
              className="w-full p-2 pr-9 border cursor-pointer hover:bg-gray-100 focus:bg-gray-100  
                         border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 appearance-none 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="">Choose Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-10 pointer-events-none text-gray-500">
              <IoIosArrowDown />
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium 
                            hover:bg-green-600 transition-all shadow-md cursor-pointer"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                            hover:bg-red-600 transition-all shadow-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyEmployee;

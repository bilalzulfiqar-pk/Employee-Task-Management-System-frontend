import React, { useState } from "react";
import Swal from "sweetalert2";


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Employee Data:", employee);
    // alert("Employee added successfully (frontend only for now)");

    Swal.fire({
      icon: "success",
      title: "Employee added",
      text: "(Code needs to be implemented yet)",
      showConfirmButton: false,
      timer: 1500,
    });

    setEmployee({ name: "", role: "", email: "", password: "" });
  };

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Employee
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-md"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

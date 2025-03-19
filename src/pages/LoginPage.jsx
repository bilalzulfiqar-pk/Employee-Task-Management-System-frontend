import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { data, setLoggedInUser } = useContext(DataContext); // Get context
  // console.log(data.employees);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  function handleLogin(e) {
    e.preventDefault(); // Prevents page refresh

    const foundEmployee = data.employees.find(
      (emp) =>
        emp.email.toLowerCase() === formData.email.toLowerCase() &&
        emp.password === formData.password
    );

    const foundAdmin = data.admins.find(
      (admin) =>
        admin.email.toLowerCase() === formData.email.toLowerCase() &&
        admin.password === formData.password
    );

    if (foundAdmin) {
      // alert(`Welcome Admin, ${foundAdmin.name}!`);
      setLoggedInUser({
        name: foundAdmin.name,
        email: foundAdmin.email,
        category: foundAdmin.category,
      });
      navigate("/");
    } else if (foundEmployee) {
      // alert(`Welcome Employee, ${foundEmployee.name}!`);
      setLoggedInUser({
        name: foundEmployee.name,
        email: foundEmployee.email,
        category: foundEmployee.category,
      });
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
              autoComplete="on"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg font-medium 
                       hover:bg-blue-600 transition-all shadow-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

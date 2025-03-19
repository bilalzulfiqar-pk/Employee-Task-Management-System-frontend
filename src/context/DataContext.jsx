import React, { createContext, useState, useEffect } from "react";
import jsonData from "../data/data.json";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setdata] = useState(jsonData);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(localStorage.getItem("etms_loggedInUser")) || null;
  });

  const getLoggedInUserData = () => {
    if (!loggedInUser) return null;

    if (loggedInUser.category === "employee") {
      const employee = data.employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee) {
        const { password, ...employeeData } = employee; // Exclude password
        return employeeData;
      }
    } else if (loggedInUser.category === "admin") {
      const employeesWithoutPasswords = data.employees.map(
        ({ password, ...empData }) => empData
      );
      const allTasks = employeesWithoutPasswords.flatMap((emp) =>
        emp.tasks.map((task) => ({
          ...task,
          employeeName: emp.name, // Add employee's name to each task
        }))
      );

      return {
        ...loggedInUser,
        employees: employeesWithoutPasswords,
        allTasks,
      };
    }

    return null;
  };

  // Sync localStorage when user logs in or out
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("etms_loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("etms_loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <DataContext.Provider
      value={{
        data,
        setdata,
        loggedInUser,
        setLoggedInUser,
        getLoggedInUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

import React, { useContext, useState } from "react";
import TasksEmp from "../components/TasksEmp";
import { DataContext } from "../context/DataContext";
import CustomDropdown from "../components/CustomDropdown";

const TasksEmployee = () => {
  const { getLoggedInUserData } = useContext(DataContext);
  const userData = getLoggedInUserData();

  if (!userData) {
    return <div className="p-6 text-red-500">No user data found.</div>;
  }

  const isAdmin = userData.category === "admin";
  const allTasks = userData.allTasks || [];
  const employeeTasks = userData.tasks || [];

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Get unique employees for admin dropdown
  const employeeList = [
    "All Employees",
    ...new Set(allTasks.map((task) => task.employeeName)),
  ];

  // Filter tasks based on admin selection
  let filteredTasks = isAdmin
    ? selectedEmployee && selectedEmployee !== "All Employees"
      ? allTasks.filter((task) => task.employeeName === selectedEmployee)
      : allTasks
    : employeeTasks;

  // Sorting Logic
  if (sortBy === "Priority") {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (sortBy === "Date") {
    filteredTasks = [...filteredTasks].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  } else if (sortBy === "Completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "Completed");
  } else if (sortBy === "Uncompleted") {
    filteredTasks = filteredTasks.filter((task) => task.status !== "Completed");
  }

  return (
    <div className="main h-full w-full">
      <div className="Tasks-block w-full flex flex-col">
        <div className="w-full p-6 pl-20 max-[450px]:pl-10 max-[450px]:pr-10 pr-20 pb-0 flex gap-3 max-[1060px]:flex-col justify-between">
          <div className="text-4xl">Tasks</div>
          <div className="flex justify-end items-center max-[736px]:flex-col flex-wrap gap-3 text-gray-800 text-lg font-medium">
            {/* Task Sorting */}
            <div className="space-x-3 max-[736px]:w-full">
              <span className="max-[1060px]:hidden">Sort:</span>
              <CustomDropdown
                options={[
                  "None",
                  "Priority",
                  "Date",
                  "Completed",
                  "Uncompleted",
                ]}
                selected={sortBy}
                setSelected={setSortBy}
                category="Sorting"
              />
            </div>

            {/* Employee Selection (Admin Only) */}
            {isAdmin && (
              <div className="space-x-3 max-[736px]:w-full">
                <span className="max-[1060px]:hidden">Select Employee:</span>
                <CustomDropdown
                  options={employeeList}
                  selected={selectedEmployee}
                  setSelected={setSelectedEmployee}
                  category="Employees"
                />
              </div>
            )}

            <p className="text-gray-700 min-w-40 max-[736px]:w-full max-[736px]:text-end">
              Showing {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        {/* Display Tasks */}
        <div className="w-full h-fit overview p-20 max-[450px]:p-10 pb-4 pt-4 flex flex-col gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TasksEmp
                key={index}
                task={task}
                employeeName={isAdmin ? task.employeeName : null}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksEmployee;

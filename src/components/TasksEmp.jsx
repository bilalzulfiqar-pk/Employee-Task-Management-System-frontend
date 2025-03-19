import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import Swal from "sweetalert2";

const TasksEmp = ({ task, employeeName }) => {
  const { loggedInUser, setLoggedInUser } = useContext(DataContext); // Use context

  const handleDelete = () => {
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
          title: "Task Deleted",
          text: "(Code need to implement yet)",
          showConfirmButton: false,
          timer: 1000,
        });
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };
  const handleStart = () => {
    Swal.fire({
      title: "Are you ready to start the task?",
      text: "This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Start it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Task Marked as Started",
          text: "(Code need to implement yet)",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };
  const handleFailed = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can still mark the mark the task as Completed later",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "I could not complete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Task Marked as Failed",
          text: "(Code need to implement yet)",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };
  const handleCompleted = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "I completed it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#00A63E",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Task Marked as Completed",
          text: "(Code need to implement yet)",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 flex flex-col gap-4 w-full h-auto">
        {employeeName && (
          <div className="flex items-center gap-2 text-gray-800 font-medium text-lg">
            <FaUser className="text-blue-500" />
            <span className="text-2xl">{employeeName}</span>
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-800 mt-0">
          {task.title}
        </h3>

        <div className="flex justify-between items-center mt-2 text-gray-700">
          <span className="text-sm font-medium">
            Priority:{" "}
            <span
              className={`${
                task.priority === "High"
                  ? "text-red-500"
                  : task.priority === "Low"
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {task.priority}
            </span>
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Deadline:</span> {task.date}
        </div>
        <div
          className={`px-3 py-1 text-white rounded-lg text-sm w-max ${
            task.status === "Failed"
              ? "bg-red-500"
              : task.status === "In Progress"
              ? "bg-yellow-500"
              : task.status === "Completed"
              ? "bg-green-500"
              : "bg-blue-500"
          } font-medium`}
        >
          Status: {task.status}
        </div>
        <div className="text-gray-700 text-sm leading-relaxed">
          <span>
            <span className="font-semibold">Description:</span>{" "}
            {task.description}
          </span>
        </div>
        <div className="flex gap-3 justify-center items-center mt-4">
          {loggedInUser?.category === "employee" && task.status === "New" && (
            <button
              onClick={handleStart}
              className="px-4 py-2 text-white rounded-lg text-base bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer"
            >
              Start
            </button>
          )}
          {loggedInUser?.category === "employee" &&
            task.status == "In Progress" && (
              <button
                onClick={handleFailed}
                className="px-4 py-2 text-white rounded-lg text-base bg-red-500 hover:bg-red-600 transition-all cursor-pointer"
              >
                Could not Complete
              </button>
            )}
          {loggedInUser?.category === "employee" &&
            task.status !== "Completed" &&
            task.status !== "New" && (
              <button
                onClick={handleCompleted}
                className="px-4 py-2 text-white rounded-lg text-base bg-green-500 hover:bg-green-600 transition-all cursor-pointer"
              >
                Completed
                {task.status === "Failed" && " Now"}
              </button>
            )}
          {loggedInUser?.category === "admin" && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white rounded-lg text-base bg-red-500 hover:bg-red-600 transition-all cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TasksEmp;

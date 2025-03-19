import React, { useContext, useEffect } from "react";
import TasksOverview from "../components/TasksOverview";
import TasksDashboard from "../components/TasksDashboard";
import { DataContext } from "../context/DataContext";

const Dashboard = () => {
  const { getLoggedInUserData } = useContext(DataContext);
  const userData = getLoggedInUserData();
  // console.log(userData);

  if (!userData) {
    return <div className="p-6 text-red-500">No user data found.</div>;
  }

  const isAdmin = userData.category === "admin";
  //   console.log(isAdmin)
  const tasks = isAdmin ? userData.allTasks : userData.tasks;

  return (
    <>
      <div className="main h-full w-full">
        <div className="overview-block w-full flex flex-col ">
          <div className="text-4xl w-full max-[450px]:pl-10 p-6 pl-20 pb-0">Overview</div>
          <div className="w-full h-fit overview p-20 max-[450px]:p-10 max-[450px]:pt-4 max-[450px]:pb-4 pb-4 pt-4 flex justify-between flex-wrap gap-6">
            <TasksOverview
              color="blue"
              title="New Tasks"
              number={tasks.filter((task) => task.status === "New").length}
            />
            <TasksOverview
              color="yellow"
              title="In Progress"
              number={
                tasks.filter((task) => task.status === "In Progress").length
              }
            />
            <TasksOverview
              color="green"
              title="Completed Tasks"
              number={
                tasks.filter((task) => task.status === "Completed").length
              }
            />
            <TasksOverview
              color="red"
              title="Failed"
              number={tasks.filter((task) => task.status === "Failed").length}
            />
          </div>
        </div>
        <div className="Tasks-block w-full flex flex-col ">
          <div className="text-4xl w-full p-6 pl-20 max-[450px]:pl-10 pb-0 pt-2">Tasks</div>
          <div className="w-full h-fit overview p-20 max-[450px]:p-10 max-[450px]:pt-4 max-[450px]:pb-4 pb-4 pt-4 flex flex-wrap gap-6">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TasksDashboard
                  key={index}
                  task={task}
                  //   employeeName={isAdmin ? task.employeeName : null}
                />
              ))
            ) : (
              <p className="text-gray-500">No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

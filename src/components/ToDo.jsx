import React, { useState } from "react";
import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const ToDo = () => {
  // to set the task
  const [task, setTask] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // when the form is submitted then the task is stored
  const handleSubmit = (e) => {
    e.preventDefault();
    let taskData = e.target.taskInput.value.trim();
    let priority = e.target.priority.value;

    if (taskData === "") {
      alert("Task cannot be empty ");
    } else {
      const newTasks = [
        ...task,
        { text: taskData, completed: false, priority },
      ];
      setTask(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    e.target.taskInput.value = "";
  };

  // delete task function
  const handleDelete = (index) => {
    const updatedTaskList = task.filter((_, i) => i !== index);
    setTask(updatedTaskList);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
  };

  // complete task function
  const toggleComplete = (index) => {
    const updatedTaskList = task.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTaskList);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
  };

  // clear task
  const handleClearAll = () => {
    setTask([]);
    localStorage.setItem("tasks", JSON.stringify([]));
  };

  // sorting the tasks
  const [filter, setFilter] = useState("All");
  const filteredTasks = task.filter((taskItem) => {
    if (filter === "All") return true;
    if (filter === "Completed") return taskItem.completed;
    if (filter === "Incomplete") return !taskItem.completed;
    return taskItem.priority === filter;
  });

  return (
    <div className="w-full min-h-screen mx-auto p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-6">
          ToDo App
        </h1>

        {/* Form to Add Tasks */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-3">
            <input
              type="text"
              placeholder="Add a new task"
              className="flex-1 p-4 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 transition"
              name="taskInput"
            />
            <select
              name="priority"
              className="bg-gray-800 text-white rounded-lg py-4 px-5"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-500 py-3 px-6 rounded-lg text-white font-semibold hover:bg-indigo-600 transition w-fit cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* sort feature */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg py-2 px-4 my-4 w-full sm:w-auto"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {/* Task List */}
        <div className="mt-6 space-y-4">
          {filteredTasks.length === 0 ? (
            <h2 className="text-center text-gray-400 text-xl">
              No tasks to display
            </h2>
          ) : (
            filteredTasks.map((taskItem, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md transition-all transform ${
                  taskItem.completed ? "bg-green-600" : ""
                }`}
              >
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => toggleComplete(index)}
                >
                  {taskItem.completed ? (
                    <FaCheckCircle className="text-green-400 text-xl" />
                  ) : (
                    <FaRegCircle className="text-gray-400 text-xl" />
                  )}
                  <p
                    className={`text-white text-lg ${
                      taskItem.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {taskItem.text}
                  </p>
                </div>

                {/* Priority Display */}
                <span
                  className={`bg-blue-300 px-5 py-1 rounded-2xl ${
                    taskItem.priority === "High"
                      ? "bg-red-500"
                      : taskItem.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {taskItem.priority}
                </span>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-xl hover:text-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Clear All Button */}
        {task.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full mt-6 py-3 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDo;

import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  const defultData = {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["web", "python", "api"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defultData]);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  // Add and Edit
  const handleAddAndEdit = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            setTaskToUpdate(null);
            return newTask;
          }
          return task;
        })
      );
    }
    setIsModalOpen(false);
  };

  // What Comes For Edit
  const handleEdit = (task) => {
    setTaskToUpdate(task);
    setIsModalOpen(true);
  };

  // For CLosing Modal
  const handleClose = () => {
    setIsModalOpen(false);
    setTaskToUpdate(null);
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    const filterTask = tasks.filter((task) => task.id !== taskId);
    setTasks(filterTask);
  };

  // Delete All Task
  const handleAllDeleteTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  // Adding On Fav
  const handleIsFav = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    setTasks(newTask);
  };

  // search feature
  const handleSearch = (searchTearms) => {
    const filted = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTearms.toLowerCase())
    );

    setTasks([...filted])
  };

  return (
    <section className="mb-20" id="tasks">
      {isModelOpen && (
        <AddTaskModal
          taskToUpdate={taskToUpdate}
          handleOnClose={handleClose}
          onAdd={handleAddAndEdit}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            handleOnDelete={handleAllDeleteTask}
            handleOnAdd={() => setIsModalOpen(true)}
          />
          {tasks.length > 0 ? (
            <TaskList
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
              tasks={tasks}
              isFav={handleIsFav}
            />
          ) : (
            <div>No Task Found</div>
          )}
        </div>
      </div>
    </section>
  );
}

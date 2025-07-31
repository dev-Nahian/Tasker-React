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

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
      // setTaskToUpdate(null)
    }
    setIsModalOpen(false);
  };

  // What Comes For Edit
  const handleEdit = (task) => {
    setTaskToUpdate(task);
    setIsModalOpen(true);
  };

  // For CLosing Modal
  const handleModalClose = () => {
    setIsModalOpen(false)
    setTaskToUpdate(null)
  }

  // Delete Task
  const handleDeleteTask = (taskId) =>{
    const deletedTask = tasks.filter(task => task.id !== taskId)
    setTasks(deletedTask)

  }

  // Delete All Task
  const handleOnDelete = () => {
    tasks.length = 0
    setTasks([...tasks])
  }

  return (
    <section className="mb-20" id="tasks">
      {isModelOpen && (
        <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleModalClose} />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">{/* <SearchTask /> */}</div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction handleOnDelete={handleOnDelete} handleOnAdd={() => setIsModalOpen(true)} />
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDeleteTask} />
        </div>
      </div>
    </section>
  );
}

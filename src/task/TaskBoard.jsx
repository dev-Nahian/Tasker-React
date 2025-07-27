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
    Priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defultData]);
  const [isModelOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (newTask) => {
    console.log("Adding Task", newTask);
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <section className="mb-20" id="tasks">
      {isModelOpen && <AddTaskModal onSave={handleAddTask} />}
      <div className="container">
        <div className="p-2 flex justify-end">
          {/* <SearchTask /> */}
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction handleOnAdd={() => setIsModalOpen(true)} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
}

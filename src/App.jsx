import AddTask from "./components/AddTask";
import GoToApi from "./components/GoToApi";
import TaskList from "./components/TaskList";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Title from "./components/Tittle";

function App() {
  const [tasks, setTasks] = useState(
    //Tentar carregar as tarefas existentes do localStorage, se não houver nada lá, usar uma lista padrão de tarefas
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 0,
        title: "Passear o cão",
        description: "Andar 30 minutos no parque com o cão.",
        isCompleted: false,
      },
      {
        id: 1,
        title: "Dar comida aos peixes",
        description: "Dar comida aos peixes do aquário.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Ir ao ginásio",
        description: "Treinar 1 hora de musculação e 30min de cárdio.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Estudar React",
        description: "Treinar React + Tailwind CSS.",
        isCompleted: false,
      },
    ]
  );

  // Criação de um efeito colateral que será executado sempre que a lista de tarefas (tasks) for alterada.
  useEffect(() => {
    //1. Atualizar o localStorage com a nova lista de tarefas
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        //se task clicada for a task que quero atualizar, altero o estado para completo
        return { ...task, isCompleted: !task.isCompleted };
      }
      //Não preciso atualizar esta tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6 overflow-auto">
      <div className="w-[500px] space-y-4">
        <Title>
          Task Manager - Projeto React + TailwindCSS + Vite + localStorage
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <TaskList
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />

        <div className="pt-5">
          <GoToApi />
        </div>
      </div>
    </div>
  );
}

export default App;

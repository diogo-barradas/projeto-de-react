import { SquareChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Title from "../components/Tittle";

function TaskManagerAPI() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      //chamar a api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
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
      <div className="w-[1000px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <SquareChevronLeft />
          </button>
          <Title>
            Task Manager - Projeto React + TailwindCSS + Vite + API
            JSONPlaceholder
          </Title>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-[500px]">
            <AddTask onAddTaskSubmit={onAddTaskSubmit} />
          </div>

          <TaskList
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
          />
        </div>

        <div className="text-justify text-slate-100 pb-10">
          <p className="text-2xl">
            Apenas um exemplo de como consumir dados em formato JSON a partir de
            uma API. Como a API utilizada é uma dummy API (JSON Placeholder),
            não é possível efetuar realmente o POST de novas tarefas.
          </p>
          <ul className="text-lg list-disc">
            <li>
              Sempre que a aplicação é iniciada, o useEffect faz a chamada à API
              e define no estado as mesmas 10 tarefas iniciais.
            </li>
            <li>
              Num cenário real, ao criar uma nova tarefa seria feita uma chamada
              à API para gravar essa informação na base de dados e, de seguida,
              outra chamada para obter a lista de tarefas atualizada.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskManagerAPI;

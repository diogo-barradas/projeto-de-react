import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function TaskList(props) {
  const navegate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navegate(`/detalhes-da-tarefa?${query.toString()}`);
  }
  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {props.tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              onClick={() => props.onTaskClick(task.id)}
              className={`bg-slate-400 text-white p-2 rounded-md w-full text-left ${
                task.isCompleted && "line-through !bg-green-500"
              }`}
            >
              {task.title}
            </button>
            <Button onClick={() => onSeeDetailsClick(task)}>
              <ChevronRightIcon />
            </Button>
            <Button onClick={() => props.onDeleteTaskClick(task.id)}>
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

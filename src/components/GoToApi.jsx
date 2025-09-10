import { useNavigate } from "react-router-dom";

function GoToApi() {
  const navegate = useNavigate();

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <button
        onClick={() => navegate("/task-manager-com-API")}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Testar com JSONPlaceholder API
      </button>
    </div>
  );
}

export default GoToApi;

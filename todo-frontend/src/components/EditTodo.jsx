import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodoById } from "../services/TodoService";

const EditTodo = () => {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const todo = await getTodoById(id); // ✅ Fetching a single task
    setTask(todo.task);
    setDetails(todo.details);
  };

  useEffect(() => {
    fetchTodos();
  }, [id]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // ✅ Prevent default form submission
      await updateTodoById(id, { task, details }); // ✅ Now updateTodo expects id + updatedTask
      navigate("/");
    }
    setValidated(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`container mt-4 needs-validation ${
        validated ? "was-validated" : ""
      }`}
      noValidate
    >
      <div className="mb-3">
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ border: "1px solid" }}
          required
        />
        <div className="invalid-feedback">Please provide a Task.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Details</label>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={{ border: "1px solid" }}
          required
        />
        <div className="invalid-feedback">Please provide a Details.</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </form>
    );
};

export default EditTodo;

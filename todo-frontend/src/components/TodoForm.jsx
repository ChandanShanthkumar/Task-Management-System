import { useState } from "react";
import { addTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      await addTodo({ task, details });
      navigate("/"); // Redirect to home after adding the task
    }
    setValidated(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`container mt-4 needs-validation ${validated ? "was-validated" : ""}`}
      noValidate
    >
      <div className="mb-3">
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          style={{ border: "1px solid" }}
          required
        />
         <div className="invalid-feedback">
            Please provide a Task.
          </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Details</label>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          style={{ border: "1px solid" }}
          required
        />
          <div className="invalid-feedback">
            Please provide a Details.
          </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" className="btn btn-secondary ms-2" onClick={() => window.history.back()}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;

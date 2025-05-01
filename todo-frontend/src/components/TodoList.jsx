import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  getTodos,
  deleteTodoById,
  updateTodoStatus,
  deleteAllCompletedTodos,
  getCompletedTodos,
} from "../services/TodoService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);


  const [filteredTodos, setFilteredTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const SEARCH_TODO = "search";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if token exists
    if (!token) navigate("/login");
  }, []);
  
  const fetchTodos = async () => {
    const response = await getTodos();
    for (let i = 0; i < response.length; i++) {
      if (response[i].isCompleted === undefined) {
        response[i].isCompleted = false;
      }
    }
    response.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTodos(response);
    setFilteredTodos(response);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodoById(id);
    fetchTodos();
  };

  const handleComplete = async (id, isCompleted) => {
    await updateTodoStatus(id, isCompleted);
    fetchTodos();
  };

  const fetchHistory = async () => {
    const response = await getCompletedTodos();
    response.sort((a, b) => new Date(b.date) - new Date(a.date));
    setHistory(response);
  };

  const handleDeleteAllCompleted = async () => {
    await deleteAllCompletedTodos();
    fetchTodos();
  };

  const toggleHistory = async () => {
    setShowHistory(!showHistory);
    await fetchHistory();
    await deleteAllCompletedTodos();
    fetchTodos();
  };

  const searchTodos = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    const filtered = todos.filter((todo) => {
      return (
        todo.task.toLowerCase().includes(searchText) ||
        todo.details.toLowerCase().includes(searchText)
      );
    });
    setFilteredTodos(filtered);
  };
  const clearSearch = () => {
    setSearch("");
    setFilter("all");
    setFilteredTodos(todos);
  };

  const filterTodos = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    if (filterValue === "all") {
      setFilteredTodos(todos);
    } else if (filterValue === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.isCompleted));
    } else {
      setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
    }
  };
  const historyContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (historyContainerRef.current && !historyContainerRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [historyContainerRef]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">List of Todos</h3>{" "}
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search todos"
            value={search}
            onChange={searchTodos}
            style={{ border: "1px solid" }}
          />
          <button className="btn btn-outline-secondary" onClick={clearSearch}>
            Clear
          </button>
        </div>
        <div className="d-flex">
          <select
            className="form-select me-2"
            value={filter}
            onChange={filterTodos}
            style={{ margin: "2px" }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button
            className="btn btn-danger"
            onClick={handleDeleteAllCompleted}
            style={{ margin: "2px" }}
          >
            <button
                className="btn btn-info"
                onClick={toggleHistory}
                style={{ margin: "2px" }}
              >
              History
            </button>
            Delete All Completed
          </button>


        </div>
      </div>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Task</th>
              <th>Details</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredTodos.length === 0 && (
                        <tr><td colSpan="6" className="text-center">No todos found.</td></tr>
                    )}
            {filteredTodos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </td>
                <td
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.details}
                </td>
                <td>
                  {new Date(todo.date).toLocaleDateString()}
                  {new Date(todo.date).toLocaleTimeString()}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) =>
                      handleComplete(todo.id, e.target.checked)
                    } 
                  />
                </td>
                <td>
                  <Link
                  
                    to={`/edittodo/${todo.id}`}
                    className="btn btn-warning btn-sm me-2 history-button"
                    style={{ margin: "2px" }}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todo.id)}
                    style={{margin:"2px"}}
                    
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>
      <div ref={historyContainerRef}>
        {showHistory && (
          <div className="mt-4">
            <h4>Completed Tasks History</h4>
            <ul className="list-group">
              {history.map((item) => (
                <li key={item.id} className="list-group-item">
                  <p>
                    <strong>Task:</strong> {item.task}
                  </p>
                  <p>
                    <strong>Details:</strong> {item.details}
                  </p>
                  <p>
                    Completed on: {new Date(item.date).toLocaleDateString()}{" "}
                    {new Date(item.date).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
       
        
      </div>
    </div>
  );
};

export default TodoList;

tool_code
print(default_api.natural_language_write_file(language = "javascript", path = "todo-frontend/src/pages/LoginPage.jsx", prompt = "In javascript, Create a new page for login. Add a form with username and password. Add the correct logic to call the backend. Use the correct function from AuthService. Also add the style."))

```
tool_outputs
{"natural_language_write_file_response": {"result": "The file was created", "status": "succeeded"}}
```
javascript
import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {\n    const token = localStorage.getItem(\"token\");\n    if (token) {\n        setIsLoggedIn(true);\n    }\n  }, []);


  
  

  if (isLoggedIn) {
    return <Navigate to="/showtodo" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = await AuthService.login(username, password);
      localStorage.setItem("token", token);
      navigate('/showtodo');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred during login.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
css
/* LoginPage.css */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .login-form {\n
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .login-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-sizing: border-box;
  }
  
  .login-form button {
    width: 100%;
    background-color: #5cb85c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-form button:hover {
    background-color: #4cae4c;
  }
  
  .error-message {
    color: red;
    margin-bottom: 10px;
    text-align: center;
  }


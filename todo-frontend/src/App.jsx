// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import EditTodo from './components/EditTodo';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';



const App = () => (
  <Router>
    <Header />
    <Navbar />

    <main className="container my-4">
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/addtodo" element={<TodoForm />} />
            <Route element={<PrivateRoute />}>
            <Route path="/showtodo" element={<TodoList />} />
            <Route path="/edittodo/:id" element={<EditTodo />} /> </Route>

          
      </Routes>
    </main>

    <Footer />
  </Router>
);

export default App;

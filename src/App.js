import React from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/confirm.module.css";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      {/* <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span> */}
      <div className={todo.isDone ? styles.rowdone : styles.row}>
        {todo.text}
      </div>
      <div>
        <Button
          variant="outline-success"
          onClick={() => markTodo(index)}
          style={{ marginRight: "5px" }}
        >
          ✓
        </Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ☓
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <br></br>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <html>
      <body className="body">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <FormTodo addTodo={addTodo} />
          <div>
            <div className="app">
              <Router>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/reset" element={<Reset />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Routes>
              </Router>
            </div>
            {todos.map((todo, index) => (
              <Card className={todo.isDone ? styles.rowdone : styles.row}>
                <Card.Body>
                  <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    markTodo={markTodo}
                    removeTodo={removeTodo}
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;

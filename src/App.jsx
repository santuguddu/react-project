import React, { useState } from "react";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

// Header Component
const Header = () => {
  return <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>📌 To-Do List</h1>;
};

// ToDoItem Component (Handles individual tasks)
const ToDoItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() !== "") {
      editTask(task.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: task.completed ? "#d4edda" : "#f8f9fa",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {isEditing ? (
        <input
          type="text"
          style={{
            flex: "1",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        // ✅ FIX: Ensure text is displayed properly
        <span
          style={{
            flex: "1",
            fontSize: "16px",
            color: "#000", // Ensure text is visible
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text || "No text available"} {/* Ensures text is always displayed */}
        </span>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        {isEditing ? (
          <button
            style={{
              color: "blue",
              fontSize: "18px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={handleEdit}
          >
            ✔
          </button>
        ) : (
          <button
            style={{
              color: "orange",
              fontSize: "18px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        )}
        <button
          style={{
            color: "green",
            fontSize: "18px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => toggleComplete(task.id)}
        >
          <FaCheck />
        </button>
        <button
          style={{
            color: "red",
            fontSize: "18px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => deleteTask(task.id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};


// ToDoList Component (Renders all tasks)
const ToDoList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <ul style={{ width: "100%", maxWidth: "400px", padding: "0", listStyleType: "none" }}>
      {tasks.map((task) => (
        <ToDoItem 
          key={task.id}  
          task={task} 
          toggleComplete={toggleComplete} 
          deleteTask={deleteTask} 
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

// App Component (Main Logic & State Management)
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    console.log("Task ID toggled:", id);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw", // Full width
        height: "100vh", // Full height
        padding: "20px",
        background: "linear-gradient(to right, #4A90E2, #8E44AD)",
        color: "white",
    }}>
      <Header />
      <div style={{ display: "flex", marginBottom: "20px", width: "100%", maxWidth: "400px" }}>
      <input
  type="text"
  style={{
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px 0 0 5px",
    fontSize: "16px",
    color: "#333",  // ✅ Fix: Ensure text is visible
    background: "white"
 // ✅ Fix: Ensure input background is white
  }}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="✏️ Add a new task"
/>

        <button 
          style={{
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "0 5px 5px 0",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ToDoList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default App;
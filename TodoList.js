import React, { useState, useRef } from "react";
import "boxicons/css/boxicons.min.css";

const TodoList = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const editInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      setTodos([...todos, { text, done: false }]);
      setText("");
    }
  };

  const handleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const handleEdit = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setTimeout(() => {
      editInputRef.current.focus();
    }, 0);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit(index, e.target.innerText);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="title">To-Do List</div>
        <form onSubmit={handleSubmit} className="search-container">
          <input
            placeholder="Enter a new To-Do"
            className="search-field"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="Add" name="" className="search-button" />
        </form>
        <div className="new-container">
          {todos.map((todo, index) => (
            <div key={index} className="list-wrapper">
              <div className="done-list">
                <div className="done">
                  <box-icon
                    className="done-icon"
                    name={todo.done ? "checkbox-checked" : "checkbox"}
                    onClick={() => handleDone(index)}
                  ></box-icon>
                </div>
                <ul className="list-container">
                  <li
                    className={`list-item ${todo.done ? "strikethrough" : ""}`}
                    contentEditable={editIndex === index}
                    suppressContentEditableWarning
                    onBlur={(e) => handleEdit(index, e.target.innerText)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={editIndex === index ? editInputRef : null}
                  >
                    {todo.text}
                  </li>
                </ul>
              </div>
              <div className="edit-delete">
                <div className="edit" onClick={() => handleEditClick(index)}>
                  <box-icon type="solid" name="edit"></box-icon>
                </div>
                <div className="delete" onClick={() => handleDelete(index)}>
                  <box-icon name="x"></box-icon>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

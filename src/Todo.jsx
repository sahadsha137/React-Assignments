import React from "react";
import "./Todo.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      editingId: null, // Tracks the ID of the TODO being edited
      editText: '',    // Holds the new text while editing
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleAdd = () => {
    if (this.state.newTodo.trim()) {
      this.props.onAddTodo({
        text: this.state.newTodo.trim(),
        id: Date.now(),
      });
      this.setState({ newTodo: '' });
    }
  };

  handleEdit = (id, currentText) => {
    this.setState({ editingId: id, editText: currentText });
  };

  handleSave = (id) => {
    this.props.onEditTodo(id, this.state.editText);
    this.setState({ editingId: null, editText: '' });
  };

  render() {
    return (
      <div className="component-container">
        <h1 className="title">TODO List</h1>
        <div className="dataSet">
          {this.props.todos.map((todo) => (
            <div className="item-card flex" key={todo.id}>
              {this.state.editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={this.state.editText}
                    onChange={this.handleEditChange}
                  />
                  <button
                    style={{ backgroundColor: 'blue' }}
                    onClick={() => this.handleSave(todo.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button
                    style={{ backgroundColor: 'orange' }}
                    onClick={() => this.handleEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: 'red' }}
                    onClick={() => this.props.onDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
          />
          <button style={{ backgroundColor: 'green' }} onClick={this.handleAdd}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;

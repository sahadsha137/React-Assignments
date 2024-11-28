import './App.css';
import Todo from './Todo';
import RandomText from './RandomText';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleData: [],
      randomTexts: [],
      useLocalStorage: true, // Determines storage type
    };
  }

  // Function to generate random text
  generateRandomText = () => {
    const length = Math.floor(Math.random() * (64 - 8 + 1)) + 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Lifecycle method for initialization
  componentDidMount() {
    // Load TODOs from storage
    const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
    const todos = JSON.parse(storage.getItem('todos')) || [];
    this.setState({ sampleData: todos });

    // Generate random texts after 10 seconds
    setTimeout(() => {
      const randomTexts = Array.from({ length: 5 }, () => this.generateRandomText());
      this.setState({ randomTexts });
    }, 10000);
  }

  componentDidUpdate(_, prevState) {
    // Persist TODOs when state changes
    if (prevState.sampleData !== this.state.sampleData) {
      const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
      storage.setItem('todos', JSON.stringify(this.state.sampleData));
    }
  }

  // Handle checkbox change
  toggleStorage = () => {
    this.setState((prevState) => ({
      useLocalStorage: !prevState.useLocalStorage,
    }));
    
  };

  // Add a new TODO
  handleAddTodo = (todo) => {
    this.setState((prevState) => ({
      sampleData: [...prevState.sampleData, todo],
    }));
  };

  // Delete a TODO
  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      sampleData: prevState.sampleData.filter((todo) => todo.id !== id),
    }));
  };

  render() {
    return (
      <>
        <label style={{margin:'10px'}}>
          Persist Data:
          <input
            type="checkbox"
            checked={this.state.useLocalStorage}
            onChange={this.toggleStorage}
          />
        </label>
        <div className="App flex">

          <Todo
            todos={this.state.sampleData}
            onAddTodo={this.handleAddTodo}
            onDeleteTodo={this.handleDeleteTodo}
          />
          <RandomText texts={this.state.randomTexts} />
        </div>
      </>
    );

  }
}

export default App;

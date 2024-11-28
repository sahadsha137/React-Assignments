import { Component } from "react";
import "./ComponentB.css";

class ComponentB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: [], // Initialize an empty array for texts
      title: "Random Texts", // Set the title
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

  // Lifecycle method to generate random texts after 10 seconds
  componentDidMount() {
    setTimeout(() => {
      const randomTextList = Array.from({ length: 5 }, () => this.generateRandomText());
      this.setState({ texts: randomTextList });
    }, 10000);
  }
  componentWillUnmount() {
    this.setState({});
  }
  getHeading = () => {
    return this.state.title;
  };

  render() {
    return (
      <div className="component-container">
        <h1 className="title">{this.getHeading()}</h1>
        {this.state.texts.length > 0 ?
          <ul className="random-text-list">
            {this.state.texts.map((text, index) => (
              <li className="random-text-item" key={index}>
                {text}
              </li>
            ))}
          </ul>
          : <span>The data will load after 10 seconds</span>}

      </div>
    );
  }
}

export default ComponentB;

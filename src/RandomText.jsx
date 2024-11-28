import { Component } from "react";
import "./RandomText.css";

class RandomText extends Component {
  render() {
    return (
      <div className="component-container">
        <h1 className="title">Random Texts</h1>
        {this.props.texts && this.props.texts.length > 0 ? (
          <ul className="random-text-list">
            {this.props.texts.map((text, index) => (
              <li className="random-text-item" key={index}>{text}</li>
            ))}
          </ul>
        ) : (
          <span>The data will load after 10 seconds</span>
        )}
      </div>
    );
  }
}

export default RandomText;

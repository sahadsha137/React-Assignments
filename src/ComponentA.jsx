import React from "react";
import "./ComponentA.css";
import sampleData from "./sample.json";

class ComponentA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            sampleData: [], 
        }
    }

    componentDidMount() {
        this.setState({
            title: sampleData.title,
            sampleData: sampleData.sampleData, 
        });
    }
    componentWillUnmount() {
        console.log("Component is unmounting, performing cleanup.");
        this.setState = () => {
            return;
        };
    }
    getSampleData() {
        const { sampleData } = this.state; 
        if (!Array.isArray(sampleData) || sampleData.length === 0) {
            return <div>No data available</div>;
        }
        return sampleData.map((data, index) => {
            return (
                <div className="item-card" key={index}>
                    {data}
                </div>
            );
        });
    }

    getHeading() {
        return this.state.title; // Reference title from state
    }

    render() {
        return (
            <div className="component-container">
                <h1 className="title">{this.getHeading()}</h1>
                <div className="dataSet">{this.getSampleData()}</div>
            </div>
        );
    }
}

export default ComponentA;

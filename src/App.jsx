import './App.css';
import { ComponentA } from './ComponentA';
import { ComponentB } from './ComponentB';

function App() {
  return (
    <div className="App flex">
      <ComponentA className="min-300px" />
      <ComponentB/>
    </div> 
  );
}

export default App;

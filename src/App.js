import './App.css';
import LabTabs from './components/LabTabs';
import Tabs from './components/Tabs'
import {
  BrowserRouter as Router
} from "react-router-dom";

 

function App() {

  return (
    <div className="App">
    <Router>
     {/* <LabTabs/> */}
    <Tabs/>
     </Router>
    </div>
  );
}

export default App;

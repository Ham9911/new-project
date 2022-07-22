import './App.css';
import LabTabs from './components/LabTabs';
import Practice from './components/Practice'

import {
  BrowserRouter as Router,
} from "react-router-dom";
 

function App() {

  return (
    <div className="App">
    <Router>
     <LabTabs/>
     </Router>
    </div>
  );
}

export default App;

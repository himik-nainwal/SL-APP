import {Route , Routes} from "react-router-dom";
// import './index.css';
import Home from "./Home/Home";
function App() {
  return (
    <div className="flex">
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;

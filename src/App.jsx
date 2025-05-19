import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PollCreator from "./Pollcreator";
import CompletedPolls from "./CompletedPolls";
import Cool3DGraphic from "./Cool3DGraphic"

export default function App() {
  return (
    <Router>
       
      <nav className="bg-white shadow-md py-4 mb-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Poll App</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              Create Poll
            </Link>
            <Link to="/completed" className="text-gray-700 hover:text-indigo-600 font-medium">
              Completed Polls
            </Link>
          </div>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<PollCreator />} />
        <Route path="/completed" element={<CompletedPolls />} />
      </Routes>
    </Router>
  );
}

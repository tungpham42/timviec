import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import SavedJobs from "./components/SavedJobs";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/saved" element={<SavedJobs />} />
      </Routes>
    </Router>
  );
}

export default App;

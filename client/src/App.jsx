import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectAnalyzer from "./pages/ProjectAnalyzer";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      {page === "register" && <Register />}
      {page === "login" && <Login />}
      {page === "dashboard" && <Dashboard />}
      {page === "analyzer" && <ProjectAnalyzer />}
      {page === "jobs" && <Jobs />}
      {page === "skills" && <Skills />}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setPage("register")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Register
        </button>

        <button
          onClick={() => setPage("login")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Login
        </button>

        <button
          onClick={() => setPage("analyzer")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Analyzer
        </button>

        <button
          onClick={() => setPage("skills")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Skills
        </button>
        <button
          onClick={() => setPage("jobs")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Jobs
        </button>
        <button
          onClick={() => setPage("dashboard")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Dashboard
        </button>
      </div>
    </>
  );
}

export default App;

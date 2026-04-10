import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProjectAnalyzer from "./pages/ProjectAnalyzer";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      {page === "register" && <Register />}
      {page === "login" && <Login />}
      {page === "analyzer" && <ProjectAnalyzer />}

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
          className="px-4 py-2 bg-white rounded"
        >
          Analyzer
        </button>
      </div>
    </>
  );
}

export default App;

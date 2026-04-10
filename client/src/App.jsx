import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      {page === "register" ? <Register /> : <Login />}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setPage("register")}
          className="mr-2 px-4 py-2 bg-white rounded"
        >
          Register
        </button>
        <button
          onClick={() => setPage("login")}
          className="px-4 py-2 bg-white rounded"
        >
          Login
        </button>
      </div>
    </>
  );
}

export default App;
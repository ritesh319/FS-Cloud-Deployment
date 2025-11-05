import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3001/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching API"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 30 }}>
      <h1>Frontend (Vite React) + Backend (Express)</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

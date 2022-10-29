import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [testData, setTestData] = useState("");

  useEffect(() => {
    fetch("/test")
      .then((response) => response.json())
      .then((data) => {
        setTestData(data.testData);
        console.log(testData);
      });
  }, []);

  return (
    <div className="App">
      <h1>{testData}</h1>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import FileStats from "./FileStats";
import UploadForm from "./UploadForm";
import "./App.css";

export default function App() {
  const [stats, setStats] = useState({
    size: 0,
    name: "",
    type: ""
  });

  const reset = () => setStats({ size: 0 });

  return (
    <>
      <h1>upload a file with react-apollo</h1>
      <a href="upload-form.html">upload with vanilla javascript</a>
      {stats.size ? (
        <FileStats {...stats} onUploadAnother={reset} />
      ) : (
        <UploadForm onComplete={setStats} />
      )}
    </>
  );
}

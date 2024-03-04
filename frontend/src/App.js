import React from 'react';
import './App.css';

function App() {
  const handleCsvUpload = (event) => {
    const f = event.target.files[0];
    const formData = new FormData();
    formData.append('file', f);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleCsvUpload} />
      </header>
    </div>
  );
}

export default App;


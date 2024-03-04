import React, { useState, useEffect } from 'react';
import './App.css';
import Panel from './Panel';

function App() {
  const [currentFiles, setCurrentFiles] = useState([]);
  const [status, setStatus] = useState('');
    
  const handleCsvUpload = (event) => {
    const f = event.target.files[0];
    if (f) {
      setCurrentFiles([...currentFiles, { file: f, status: 'Uploading...' }]);
    }
  }

  useEffect(() => {
    currentFiles.forEach(f => {
      if (f.status === 'Uploading...') {
        handleUpload(f);
      }
    });
  }, [currentFiles]);

  const handleUpload = (f) => {
      if (!f.file) return;
      const formData = new FormData();
      formData.append('file', f.file);
      setStatus(`Uploading ${f.file.name}`);
      fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setStatus(`Submission failed: ${data.error}`);
          updateFileStatus(f, `Failed: ${data.error}`);
        }
        else {
          setStatus('Submission successful');
          updateFileStatus(f, 'Submitted');
        }
      })
      .catch(error => {
        console.error(error)
        setStatus(`Submission failed: ${error.message}`);
        updateFileStatus(f, `Failed: ${error.message}`);
      })
  }

  const updateFileStatus = (fileToUpdate, updatedStatus) => {
    setCurrentFiles(currentFiles.map(f => {
      return f === fileToUpdate ? { ...f, status: updatedStatus } : f;
    }));
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <input type="file" onChange={handleCsvUpload} className='input' />
        <Panel files={currentFiles} />
      </header>
    </div>
  );
  
}

export default App;
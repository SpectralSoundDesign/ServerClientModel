import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          throw new Error('Server is not returning JSON');
        }
      })
      .then(data => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Message from Flask backend: {message}
        </p>
      </header>
    </div>
  );
}

export default App;


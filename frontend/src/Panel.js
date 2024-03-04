import React from 'react';
import './Panel.css';

function Panel({ files }) {
    return (
      <div className='panel'>
        {files.map((f, index) => {
          if (f.file) {
            return <p className='panel.p' key={index}>{f.file.name} - {f.status}</p>
          } 
          else {
            return null;
          }
        })}
      </div>
    );
  }

export default Panel;

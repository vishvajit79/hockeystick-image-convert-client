import './App.css';

import React, { useState } from 'react';

import { API_URL } from './config';

// import axios from 'axios';
// import logo from './logo.svg';
function App() {
  const [uploadfile, useuploadfile] = useState<File | null>();
  const [filetype, usefiletype] = useState<string>();
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length !== 0) {
      useuploadfile(event.target.files[0]);
    }
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    let err_type = document.getElementById('err-type');
    err_type?.classList.add('hidden');
    let err_file = document.getElementById('err-file');
    err_file?.classList.add('hidden');
    if (!filetype || filetype === '') {
      err_type = document.getElementById('err-type');
      err_type?.classList.remove('hidden');
    } else if (!uploadfile) {
      err_file = document.getElementById('err-file');
      err_file?.classList.remove('hidden');
    } else {
      fetch(`${API_URL}?target=${filetype}`, {
        method: 'POST',
        body: uploadfile,
      }).then((response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${Date.now()}.${filetype.toLowerCase()}`;
          a.click();
        });
      });
    }
  };
  return (
    <div className='App'>
      <h1>Hockey Stick Image Converter</h1>
      <p> Upload button </p>
      <label className='upload-area'></label>
      <input
        className='file-uploader'
        type='file'
        id='myfile'
        name='myfile'
        onChange={handleFile}
      />
      <p id='err-file' className='hidden'>
        Please select a file
      </p>
      <label>Format Change</label>
      <select
        onChange={(e) => {
          usefiletype(e.target.value);
        }}
      >
        {/* GIF, BMP, PNG or JPG) */}
        <option value=''>--Select--</option>
        <option value='GIF'>GIF</option>
        <option value='BMP'>BMP</option>
        <option value='PNG'>PNG</option>
        <option value='JPG'>JPG</option>
      </select>
      <p id='err-type' className='hidden'>
        Please select image type
      </p>
      <button className='submit' onClick={handleSubmit}>
        Convert Image
      </button>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RenderRoutes } from './components/routes/routes.jsx';


localStorage.setItem('url', 'http://localhost:1308/');

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {RenderRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App

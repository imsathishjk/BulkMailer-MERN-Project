import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MailComp from './MailComp';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/mail' element={<MailComp/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
)
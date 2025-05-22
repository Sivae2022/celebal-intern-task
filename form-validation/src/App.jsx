import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './Components/Form';
import Success from './Components/Success';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

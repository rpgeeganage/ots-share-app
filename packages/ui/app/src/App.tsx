import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Create from './Create';
import Reveal from './Reveal';

export default function App() {
  console.log(window.location.pathname);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Create />} />
        <Route path="r/*" element={<Reveal />} />
        <Route path="*" element={<Create />} />
      </Route>
    </Routes>
  );
}

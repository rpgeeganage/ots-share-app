import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import CreateRecord from './CreateRecord';
import Reveal from './Reveal';

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<CreateRecord />} />
        <Route path="r/*" element={<Reveal />} />
        <Route path="*" element={<CreateRecord />} />
      </Route>
    </Routes>
  );
}

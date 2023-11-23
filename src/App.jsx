import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Schedule } from './Schedule';

export function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/stop/:stopId" element={<Schedule stopType="stop" />} />
          <Route path="/station/:stopId" element={<Schedule stopType="station" />} />

          <Route index element={<Schedule stopType="stop" defaultStopId="HSL:2112401" />} />
        </Routes>
      </div>
    </Router>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewIncomePage from './NewIncomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new-income" element={<NewIncomePage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;

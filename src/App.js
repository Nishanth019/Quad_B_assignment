import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route  path="/" element={<ShowList/>} />
      <Route path="/shows/:id"  element={<ShowDetails/>} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BestBooks from './BestBooks'; 


class App extends React.Component {
  render() {
    return (
      <Router>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<BestBooks />} />
          <Route path="/about" element={
            <div>
              <h2>About the Developer</h2>
            </div>
          } />
        </Routes>
      </Router>
    );
  }
}

export default App;

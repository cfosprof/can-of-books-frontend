import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BestBooks from './BestBooks';
import Header from './Header';
import Footer from './Footer';
import About from './About';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<BestBooks />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
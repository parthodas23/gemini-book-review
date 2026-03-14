import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Review from './pages/Review';

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen selection:bg-blue-500/30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review/:id" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
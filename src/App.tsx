import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;



import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AddWord from './AddWord';
import './App.css';
import SearchWord from './SearchWord';
import DeleteWord from './DeleteWord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-word" element={<AddWord />} />
        <Route path="/search-word" element={<SearchWord />} />
        <Route path="/delete-word" element={<DeleteWord />} />

      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>Hello Explorer</h1>
      <div className="buttons">
        <button type="button" onClick={() => navigate('/add-word')}>Add a New Word</button>
        <button type="submit" onClick={() => navigate('/search-word')}>Search for a word</button>
        <button type="submit" onClick={() => navigate('/delete-word')}>Delete the word</button>
        <button type="submit">Update the word</button>
        {/* <AddWord/> */}
      </div>
    </div>
  );
}

export default App;

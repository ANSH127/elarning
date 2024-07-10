
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link
} from 'react-router-dom';


import HomePage from './pages/HomePage';
import Header from './components/Header';




function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
    
  )
}

export default App

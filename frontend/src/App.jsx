
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link
} from 'react-router-dom';


import HomePage from './pages/HomePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CourseDetailPage from './pages/CourseDetailPage';




function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />


      </Routes>
    </Router>
    
  )
}

export default App

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm';
import HookForm from './components/HookForm';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/uncontrolled-form">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/hook-form">Hook Form</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<HookForm />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

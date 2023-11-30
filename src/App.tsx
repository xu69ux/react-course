import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm';
import HookForm from './components/HookForm';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navigation />
          <Routes>
            <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
            <Route path="/hook-form" element={<HookForm />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;

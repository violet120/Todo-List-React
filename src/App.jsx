import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, TodoPage, LoginPage, SignUpPage } from './pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="todos" element={<TodoPage />} />
          <Route path="signup" element={<SignUpPage />} />
          {/* 除了上述路徑以外的都導入 homePage */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

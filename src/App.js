import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Favorites from './components/Favorites/Favorites'
import Home from './components/Home/Home';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { Details } from './components/Details/Details';

function App() {
  const [logged, setLogged] = useLocalStorage('logged', false);
  return (
    <div>
      {logged?<Navbar />:<></>}
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route index path='/home' element={<ProtectedRoute><Navbar /><Home /></ProtectedRoute>} />
          <Route path='/favorites' element={<ProtectedRoute><Navbar /><Favorites /></ProtectedRoute>} />
          <Route path='/details/:id' element={<ProtectedRoute><Navbar /><Details /></ProtectedRoute>} />
          <Route path='*' element={<ProtectedRoute><Navbar /><Home /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
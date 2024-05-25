import { React, useState } from 'react';
import './Login.css'; // Optional: create a CSS file for styling
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Carousel from '../../utils/Carousel/Carousel';
import { useAuth } from '../../hooks/useAuth';

// Login component
const Login = () => {
  const [storedValue] = useLocalStorage('user', '');
  const [user, setUser] = useState(storedValue);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Just as example because the requirement says "Create a view to make the Login, without API call."
    if (user === 'camilo@57blocks.com' && password === 'password') {
      await login({ user });
    } else {
      setErrorMessage('Invalid user or password');
    }
  };

  return (
    <div>
      <div className="App" style={{ backgroundImage: "url('https://www.desktopbackground.org/download/1366x768/2010/10/18/97053_pokemon-wallpapers-free-download-hd-wallpaper-download-free-wallpapers_1920x1080_h.jpg')", backgroundSize: 'cover'}}>
        <div className="App-header">
          <p className='mainTitle'>
            Welcome to PokeFront App.
          </p>
          <div className="login-container">
            <h2>Login</h2>
            <Carousel />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
          <p className="subtitle">Camilo Torres App to 57blocks POC</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
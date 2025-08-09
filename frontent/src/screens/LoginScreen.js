import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, registerThunk } from '../redux/slice/authSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((s) => s.auth);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerThunk({ name, email, password }));
    } else {
      dispatch(loginThunk({ email, password }));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {userInfo && (
        <div style={{ padding: '8px', background: '#e6ffed', marginBottom: 8 }}>
          Logged in as {userInfo.name}
        </div>
      )}
      {error && (
        <div style={{ padding: '8px', background: '#ffe6e6', marginBottom: 8 }}>
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        {isRegister && (
          <div style={{ marginBottom: 8 }}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : isRegister ? 'Create Account' : 'Login'}
        </button>
      </form>
      <button style={{ marginTop: 12 }} onClick={() => setIsRegister((v) => !v)}>
        {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
}



import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateProfileThunk } from '../redux/slice/authSlice';

export default function MyAccount() {
  const dispatch = useDispatch();
  const { userInfo, loading: authLoading, error: authError } = useSelector((s) => s.auth);
  const [orders, setOrders] = useState([]); // unused after removal
  const [loading, setLoading] = useState(false); // unused after removal
  const [error, setError] = useState(''); // unused after removal
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');

  // Orders list moved to a dedicated page

  if (!userInfo) {
    return (
      <div style={{ maxWidth: 600, margin: '2rem auto' }}>
        <h2>My Account</h2>
        <p>Please login to view your account.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '1.5rem auto' }}>
      <h2>My Account</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateProfileThunk({ name, email, password: password || undefined }));
        setPassword('');
      }} style={{ padding: 12, background: '#f7f7f7', marginBottom: 16 }}>
        {authError && <div style={{ color: 'crimson', marginBottom: 8 }}>{authError}</div>}
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontWeight: 600 }}>New Password (optional)</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={authLoading}>Save Profile</button>
      </form>

      {/* Orders list moved to separate page */}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyOrders() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((s) => s.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/orders/mine', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrders(res.data || []);
      } catch (e) {
        setError(e.response?.data?.message || e.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userInfo, navigate]);

  return (
    <div style={{ maxWidth: 800, margin: '1.5rem auto' }}>
      <h2>My Orders</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {!loading && !error && orders.length === 0 && <div>No orders found.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((o) => (
          <li key={o._id} style={{ padding: 12, border: '1px solid #ddd', marginBottom: 8 }}>
            <div><strong>Order ID:</strong> {o._id}</div>
            <div><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</div>
            <div><strong>Status:</strong> {o.status}</div>
            <div><strong>Items:</strong> {o.itemsCount}</div>
            <div><strong>Total:</strong> ${Number(o.itemsTotal).toFixed(2)}</div>
            <div style={{ marginTop: 8 }}>
              <Link to={`/orders/${o._id}`}>View details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

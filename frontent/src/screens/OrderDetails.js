import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useSelector((s) => s.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { state: { from: `/orders/${id}` } });
      return;
    }
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrder(res.data);
      } catch (e) {
        setError(e.response?.data?.message || e.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userInfo, navigate, id]);

  if (loading) return <div style={{ maxWidth: 800, margin: '1.5rem auto' }}>Loading…</div>;
  if (error) return <div style={{ maxWidth: 800, margin: '1.5rem auto', color: 'crimson' }}>{error}</div>;
  if (!order) return null;

  const addr = (a) => (
    <div style={{ lineHeight: 1.4 }}>
      <div>{a.fullName}</div>
      <div>{a.address}</div>
      <div>{a.city}, {a.state} {a.postalCode}</div>
      <div>{a.country}</div>
      <div>{a.phone}</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '1.5rem auto' }}>
      <h2>Order {order._id}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <h3>Shipping Address</h3>
          {addr(order.shippingAddress)}
        </div>
        <div>
          <h3>Billing Address</h3>
          {addr(order.billingAddress)}
        </div>
      </div>

      <h3>Items</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {order.items.map((it, idx) => (
          <li key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto auto', gap: 12, alignItems: 'center', padding: 8, borderBottom: '1px solid #eee' }}>
            <img src={it.imageUrl} alt={it.name} style={{ width: 60, height: 60, objectFit: 'cover' }} />
            <div>{it.name}</div>
            <div>x {it.qty}</div>
            <div>${(it.price * it.qty).toFixed(2)}</div>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'right', marginTop: 12 }}>
        <strong>Total: ${Number(order.itemsTotal).toFixed(2)}</strong>
      </div>
    </div>
  );
}

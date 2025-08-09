import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, saveBillingAddress, setSameAsShipping } from '../redux/slice/checkoutSlice';

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const { shippingAddress, billingAddress, sameAsShipping } = useSelector((s) => s.checkout);

  const [ship, setShip] = useState(shippingAddress);
  const [bill, setBill] = useState(billingAddress);
  const [same, setSame] = useState(sameAsShipping);

  useEffect(() => {
    setBill(same ? ship : billingAddress);
  }, [same, ship]);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(saveShippingAddress(ship));
    dispatch(setSameAsShipping(same));
    if (!same) {
      dispatch(saveBillingAddress(bill));
    }
    alert('Details saved');
  }

  const autoCompleteFor = (section, key) => {
    switch (key) {
      case 'fullName':
        return `section-${section} name`;
      case 'address':
        return `section-${section} address-line1`;
      case 'city':
        return `section-${section} address-level2`;
      case 'state':
        return `section-${section} address-level1`;
      case 'postalCode':
        return `section-${section} postal-code`;
      case 'country':
        return `section-${section} country`;
      case 'phone':
        return `section-${section} tel`;
      default:
        return `section-${section} on`;
    }
  };

  const input = (section, label, obj, setObj, key, type = 'text') => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', fontWeight: 600 }}>{label}</label>
      <input
        type={type}
        value={obj?.[key] || ''}
        name={key}
        autoComplete={autoCompleteFor(section, key)}
        onChange={(e) => setObj({ ...obj, [key]: e.target.value })}
        required
      />
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: '1.5rem auto' }}>
      <h2>Checkout</h2>
      <form onSubmit={onSubmit} autoComplete="on">
        <fieldset style={{ marginBottom: 16 }}>
          <legend>Shipping Address</legend>
          {input('shipping', 'Full name', ship, setShip, 'fullName')}
          {input('shipping', 'Address', ship, setShip, 'address')}
          {input('shipping', 'City', ship, setShip, 'city')}
          {input('shipping', 'State', ship, setShip, 'state')}
          {input('shipping', 'Postal code', ship, setShip, 'postalCode')}
          {input('shipping', 'Country', ship, setShip, 'country')}
          {input('shipping', 'Phone', ship, setShip, 'phone')}
        </fieldset>

        <div style={{ marginBottom: 12 }}>
          <label>
            <input type="checkbox" checked={same} onChange={(e) => setSame(e.target.checked)} />
            Billing same as shipping
          </label>
        </div>

        {!same && (
          <fieldset style={{ marginBottom: 16 }}>
            <legend>Billing Address</legend>
            {input('billing', 'Full name', bill, setBill, 'fullName')}
            {input('billing', 'Address', bill, setBill, 'address')}
            {input('billing', 'City', bill, setBill, 'city')}
            {input('billing', 'State', bill, setBill, 'state')}
            {input('billing', 'Postal code', bill, setBill, 'postalCode')}
            {input('billing', 'Country', bill, setBill, 'country')}
            {input('billing', 'Phone', bill, setBill, 'phone')}
          </fieldset>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Save and Continue</button>
          <button type="button" onClick={() => {
            const empty = { fullName: '', address: '', city: '', state: '', postalCode: '', country: '', phone: '' };
            setShip(empty);
            setBill(empty);
            localStorage.removeItem('shippingAddress');
            localStorage.removeItem('billingAddress');
          }}>Clear saved</button>
        </div>
      </form>
    </div>
  );
}



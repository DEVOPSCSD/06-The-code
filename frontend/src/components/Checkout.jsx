
import { useState } from "react";

function Checkout({ cart, onPlaceOrder }) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      ...customer,
      items: cart,
      total,
      orderId: "ORD-" + Date.now(),
    };

    onPlaceOrder(order);
  };

  return (
    <section className="checkout-section" id="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Delivery Address"
          required
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />

        <h3>Total Amount: ₹{total}</h3>

        <button type="submit" disabled={cart.length === 0}>
          Place Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;
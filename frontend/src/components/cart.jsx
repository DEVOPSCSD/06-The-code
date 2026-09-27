
import { Trash2, Minus, Plus } from "lucide-react";

function Cart({ cart, updateQuantity, removeItem }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-section" id="cart">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.emoji} {item.name}</h3>
                <p>₹{item.price} each</p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.id, -1)
                  }
                  aria-label={`Decrease ${item.name}`}
                >
                  <Minus size={16} />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, 1)
                  }
                  aria-label={`Increase ${item.name}`}
                >
                  <Plus size={16} />
                </button>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
        </>
      )}
    </section>
  );
}

export default Cart;

import { useState } from "react";
import { ShoppingCart, Search, UtensilsCrossed } from "lucide-react";
import "./App.css";
import Cart from "./components/cart";
import Checkout from "./components/Checkout";

const foods = [
  { id: 1, name: "Chicken Biryani", price: 249, emoji: "🍛" },
  { id: 2, name: "Margherita Pizza", price: 299, emoji: "🍕" },
  { id: 3, name: "Chicken Burger", price: 149, emoji: "🍔" },
  { id: 4, name: "French Fries", price: 99, emoji: "🍟" },
  { id: 5, name: "Chocolate Cake", price: 199, emoji: "🍰" },
  { id: 6, name: "Ice Cream", price: 89, emoji: "🍨" },
];

function App() {
  
const [lastOrder, setLastOrder] = useState(null);

const handlePlaceOrder = (order) => {
  setLastOrder(order);
  setCart([]);
};
const [cart, setCart] = useState([]);

const addToCart = (food) => {
  setCart((previousCart) => {
    const existing = previousCart.find(
      (item) => item.id === food.id
    );

    if (existing) {
      return previousCart.map((item) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previousCart, { ...food, quantity: 1 }];
  });
};

const updateQuantity = (id, change) => {
  setCart((previousCart) =>
    previousCart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeItem = (id) => {
  setCart((previousCart) =>
    previousCart.filter((item) => item.id !== id)
  );
};

const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div>
      <header className="navbar">
        <h2><UtensilsCrossed /> FoodExpress</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#cart" className="cart">
  <ShoppingCart size={20} /> {cartCount}
</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <h1>Delicious Food, Delivered Fast!</h1>
        <p>Order your favourite meals from the comfort of your home.</p>
        <a href="#menu" className="order-btn">Order Now</a>
      </section>

      <section className="menu" id="menu">
        <h2>Explore Our Menu</h2>

        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search your favourite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="food-grid">
          {filteredFoods.map((food) => (
            <div className="food-card" key={food.id}>
              <div className="food-image">{food.emoji}</div>
              <h3>{food.name}</h3>
              <p>₹{food.price}</p>
              <button onClick={() => addToCart(food)}>
  Add to Cart
</button>
            </div>
          ))}
        </div>
      </section>
      <Cart
  cart={cart}
  updateQuantity={updateQuantity}
  removeItem={removeItem}
/>
<Checkout
  cart={cart}
  onPlaceOrder={handlePlaceOrder}
/>

{lastOrder && (
  <section className="order-success">
    <h2>Order Placed Successfully!</h2>
    <p>Order ID: {lastOrder.orderId}</p>
    <p>Thank you, {lastOrder.name}!</p>
    <p>Total Paid: ₹{lastOrder.total}</p>
    <p>Payment method: Cash on Delivery</p>
  </section>
)}
      <footer>
        <p>© 2026 FoodExpress. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

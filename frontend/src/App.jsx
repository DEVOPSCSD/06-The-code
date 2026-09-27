
import { useState } from "react";
import { ShoppingCart, Search, UtensilsCrossed } from "lucide-react";
import "./App.css";

const foods = [
  { id: 1, name: "Chicken Biryani", price: 249, emoji: "🍛" },
  { id: 2, name: "Margherita Pizza", price: 299, emoji: "🍕" },
  { id: 3, name: "Chicken Burger", price: 149, emoji: "🍔" },
  { id: 4, name: "French Fries", price: 99, emoji: "🍟" },
  { id: 5, name: "Chocolate Cake", price: 199, emoji: "🍰" },
  { id: 6, name: "Ice Cream", price: 89, emoji: "🍨" },
];

function App() {
  const [cart, setCart] = useState(0);
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
          <span className="cart">
            <ShoppingCart size={20} /> {cart}
          </span>
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
              <button onClick={() => setCart(cart + 1)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 FoodExpress. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
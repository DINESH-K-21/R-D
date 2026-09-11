import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-ink/50">
        Your cart is empty. <Link to="/" className="text-clay">Continue shopping</Link>
      </div>
    );
  }

  function handleCheckout() {
    if (!user) {
      navigate("/login");
      return;
    }
    clearCart();
    alert("Order placed (demo checkout — no payment integration).");
    navigate("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl mb-8">Your cart</h1>

      <div className="divide-y divide-line border-t border-b border-line">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-20 object-cover bg-line" />
            <div className="flex-1">
              <p className="text-sm">{item.title}</p>
              <p className="text-sm text-ink/50">${item.price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQty(item.id, Number(e.target.value))}
              className="w-14 border border-line px-2 py-1 bg-transparent text-sm"
            />
            <button onClick={() => removeItem(item.id)} className="text-sm text-ink/40 hover:text-clay">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-lg">Total: ${total.toFixed(2)}</span>
        <button
          onClick={handleCheckout}
          className="bg-ink text-paper px-6 py-3 hover:bg-clay transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

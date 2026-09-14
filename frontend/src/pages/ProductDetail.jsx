import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    productApi.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="max-w-6xl mx-auto px-6 py-14 text-ink/50">Loading…</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] bg-line overflow-hidden">
        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-md">
        <p className="text-xs uppercase tracking-wide text-ink/50">{product.category?.name}</p>
        <h1 className="text-3xl mt-2">{product.title}</h1>
        <p className="text-xl mt-3">${product.price.toFixed(2)}</p>
        <p className="text-ink/70 mt-6 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-3 mt-8">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-16 border border-line px-2 py-2 bg-transparent"
          />
          <button
            onClick={() => {
              addItem(product, qty);
              navigate("/cart");
            }}
            className="flex-1 bg-ink text-paper py-3 hover:bg-clay transition-colors"
          >
            Add to cart
          </button>
        </div>

        <p className="text-xs text-ink/40 mt-4">{product.stock} in stock</p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-line">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-sm">{product.title}</h3>
        <span className="text-sm text-ink/70">${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

import { useEffect, useState } from "react";
import { productApi } from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.get("/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    productApi
      .get("/", { params: activeCategory ? { category: activeCategory } : {} })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <h1 className="text-5xl leading-tight max-w-xl">
          Everyday essentials, made to last.
        </h1>
        <p className="text-ink/60 mt-4 max-w-md">
          A small, considered collection — new pieces added every season.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="flex gap-4 border-b border-line pb-4 mb-8 text-sm">
          <button
            onClick={() => setActiveCategory("")}
            className={activeCategory === "" ? "text-clay" : "text-ink/60"}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.name)}
              className={activeCategory === c.name ? "text-clay" : "text-ink/60"}
            >
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-ink/50">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-ink/50">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pb-16">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

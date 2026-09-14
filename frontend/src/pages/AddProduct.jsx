import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api/axios.js";

const initialForm = {
  title: "",
  description: "",
  price: "",
  imageUrl: "",
  stock: "0",
  categoryId: "",
};

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    productApi
      .get("/products/categories")
      .then((res) => {
        setCategories(res.data);
        if (res.data.length > 0) {
          setForm((current) => ({ ...current, categoryId: res.data[0].id }));
        }
      })
      .catch(() => setError("Could not load categories."))
      .finally(() => setLoading(false));
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    console.log("hello");
    
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await productApi.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-2">Add product</h1>
      <p className="text-ink/60 mb-8">Create a new item for the catalog.</p>

      <form className="space-y-4">
        <input
          name="title"
          placeholder="Product title"
          required
          className="w-full border border-line px-3 py-3 bg-transparent"
          value={form.title}
          onChange={updateField}
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          rows="4"
          className="w-full border border-line px-3 py-3 bg-transparent"
          value={form.description}
          onChange={updateField}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Price"
            required
            className="w-full border border-line px-3 py-3 bg-transparent"
            value={form.price}
            onChange={updateField}
          />
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            placeholder="Stock"
            required
            className="w-full border border-line px-3 py-3 bg-transparent"
            value={form.stock}
            onChange={updateField}
          />
        </div>
        <input
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          required
          className="w-full border border-line px-3 py-3 bg-transparent"
          value={form.imageUrl}
          onChange={updateField}
        />
        <select
          name="categoryId"
          required
          disabled={loading || categories.length === 0}
          className="w-full border border-line px-3 py-3 bg-paper"
          value={form.categoryId}
          onChange={updateField}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-clay">{error}</p>}
        <button
          onClick={handleSubmit}
          // type="submit"
          // disabled={saving || loading || categories.length === 0}
          className="w-full bg-ink text-paper py-3 hover:bg-clay transition-colors disabled:opacity-50"
        >
          {saving ? "Adding product..." : "Add product"}
        </button>
      </form>
    </div>
  );
}
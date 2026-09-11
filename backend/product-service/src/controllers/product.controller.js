const prisma = require("../prismaClient");

async function getProducts(req, res) {
  try {
    const { category, search } = req.query;

    const where = {};
    if (category) where.category = { name: category };
    if (search) where.title = { contains: search, mode: "insensitive" };

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getProductById(req, res) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function createProduct(req, res) {
  try {
    const { title, description, price, imageUrl, stock, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: "title, price and categoryId are required" });
    }

    const product = await prisma.product.create({
      data: { title, description, price, imageUrl, stock: stock ?? 0, categoryId },
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteProduct(req, res) {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};

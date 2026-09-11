const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const men = await prisma.category.upsert({
    where: { name: "Men" },
    update: {},
    create: { name: "Men" },
  });
  const women = await prisma.category.upsert({
    where: { name: "Women" },
    update: {},
    create: { name: "Women" },
  });
  const kids = await prisma.category.upsert({
    where: { name: "Kids" },
    update: {},
    create: { name: "Kids" },
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Oversized Cotton Shirt",
        description: "Relaxed-fit shirt in soft cotton poplin.",
        price: 24.99,
        imageUrl: "https://placehold.co/500x650?text=Product",
        stock: 40,
        categoryId: men.id,
      },
      {
        title: "Slim Fit Denim Jeans",
        description: "Classic 5-pocket jeans with slight stretch.",
        price: 39.99,
        imageUrl: "https://placehold.co/500x650?text=Product",
        stock: 25,
        categoryId: men.id,
      },
      {
        title: "Floral Wrap Dress",
        description: "Lightweight wrap dress with floral print.",
        price: 34.99,
        imageUrl: "https://placehold.co/500x650?text=Product",
        stock: 30,
        categoryId: women.id,
      },
      {
        title: "Ribbed Knit Sweater",
        description: "Soft ribbed sweater, relaxed silhouette.",
        price: 29.99,
        imageUrl: "https://placehold.co/500x650?text=Product",
        stock: 20,
        categoryId: women.id,
      },
      {
        title: "Kids Graphic Tee",
        description: "Printed cotton t-shirt for kids.",
        price: 12.99,
        imageUrl: "https://placehold.co/500x650?text=Product",
        stock: 50,
        categoryId: kids.id,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

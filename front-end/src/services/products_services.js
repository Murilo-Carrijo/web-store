export const getAllProducts = async () => {
  const products = await fetch('https://fakestoreapi.com/products')
  if (!products.ok) {
    throw new Error('Error fetching products')
  }

  const productsJson = await products.json()
  return productsJson
};

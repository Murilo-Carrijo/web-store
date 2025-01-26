export const addFavorites = async (product, token) => {
  const payload = {
    externalId: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  };
  const response = await fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
     console.log('response', response);
    throw new Error('Error registering favorites');
  }

  return alert('Produto adicionado aos favoritos');
};

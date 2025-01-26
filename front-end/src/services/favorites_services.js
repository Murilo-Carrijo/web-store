export const addFavorites = async (product, token) => {
  const favoritesList = await getFavorites(token);


  if (favoritesList.length >= 5) {
    return alert('Limite de favoritos atingido 😕');
  }

  favoritesList.forEach((favorite) => {
    if (Number(favorite.externalId) === product.id) {
      return alert('Você gostou mesmo desse produto, hein? 😏 Ele ja está na sua lista de favoritos 😉');
    }
  });

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

export const getFavorites = async (token) => {
  const response = await fetch('http://localhost:3000/favorites', {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Error getting favorites');
  }

  return response.json();
};

export const deleteByFavoriteId = async (token, id) => {
  console.log('id:', id);

  const response = await fetch(`http://localhost:3000/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Error getting favorites');
  }

  return alert('Produto removido dos favoritos');
};

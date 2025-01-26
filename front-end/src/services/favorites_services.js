export const addFavorites = async (product, token) => {
  const payload = {
    externalId: Number(product.id),
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

export const checkFavorites = async (token, product) => {
  const favoritesList = await getFavorites(token);

  console.log('favoritesList:', favoritesList);
  const result = {
    status: 'success',
    message: 'Produto adicionado aos favoritos',
  };


  if (favoritesList.length >= 5) {
    result.status = 'error';
    result.message = 'Limite de favoritos atingido 😕';
  }

  favoritesList.forEach((favorite) => {
    if (Number(favorite.externalId) === product.id) {
      console.log('favorite:', favorite.externalId);
      result.status = 'error';
      result.message = 'Você gostou mesmo desse produto, hein? 😏 Ele ja está na sua lista de favoritos 😉';
    }
  });

  return result;
};

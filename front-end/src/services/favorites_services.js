export const addFavorites = async (product, token) => {
  const payload = {
    externalId: Number(product.id),
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  };

  const result = {
    status: 'success',
    message: 'Produto adicionado aos favoritos',
  }

  const response = await fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    result.status = 'error';
    result.message = 'Erro ao adicionar produto aos favoritos';
  }

  return result;
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
      result.status = 'error';
      result.message = 'Você gostou mesmo desse produto, hein? 😏 Ele ja está na sua lista de favoritos 😉';
    }
  });

  return result;
};

export const authenticate = async (email, password) => {
  console.log(email, password);
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Error authenticating user');
  }

  const token = await response.json();
  return token;
};

export const register = async (name, email, password) => {
  console.log(email, password);
  const response = await fetch('http://localhost:3000/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    throw new Error('Error registering user');
  }

  const token = await response.json();
  return token;
}
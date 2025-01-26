import { NavLink } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { decodeToken } from '../utils/token';
import { addFavorites, checkFavorites, deleteByFavoriteId } from '../services/favorites_services';

const Card = ({ product, openLoginForm, setOpenLoginForm }) => {
  const validateToken = () => {
    const token = getCookie('token');
    if (!token) {
      setOpenLoginForm(!openLoginForm);
    }

    const user = decodeToken(token);
    if (!user) {
      setOpenLoginForm(!openLoginForm);
    }
    return token
  };

  const setFavorite = async (product) => {
    const token = validateToken();
    const checkFavoritList = await checkFavorites(token, product);
    if (checkFavoritList.status === 'error') {
      return alert(checkFavoritList.message);
    } else {
      const result = await addFavorites(product, token);
      return alert(result.message);

    }
  };

  const removeFromFavorites = async (product) => {
    const token = getCookie('token');
    await deleteByFavoriteId(token, product.id);
    window.location.reload();
  };

  return (
    <div key={product.id} className="card" style={{ display: 'inline-block', margin: '10px', width: '300px' }}>
      <img
        src={product.image}
        alt={product.title}
        style={{
          height: '300px',
          width: '100%',
          objectFit: 'contain'
        }}
      />
      <div className="card-body">
        <div style={{ textAlign: 'start', height: '33.33%' }}>
          <h6
            className="card-title"
            style={{
              fontWeight: "600",
              fontSize: '16px',
              marginBottom: '8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={product.title}>
            {product.title}
          </h6>
          <p className="card-text" style={{ marginBottom: '8px', }}>
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <NavLink to={`/products/${product.id}`} className="btn btn-primary" style={{ color: 'white', height: "33.33%" }}>
            Mais detalhes
          </NavLink>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ all: 'unset' }}
              onClick={() => setFavorite(product)}
            >
              <i className="fa-solid fa-star" style={{color:  "#fbb913"}} ></i>
            </button>
            {product.externalId && (
              <button
                style={{ all: 'unset' }}
                onClick={() => removeFromFavorites(product)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;

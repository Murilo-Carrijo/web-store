import { NavLink } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import { decodeToken } from '../utils/token';
import { addFavorites, checkFavorites, deleteByFavoriteId } from '../services/favorites_services';
import './card.css';

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
    <div key={product.id} className="product">
      <img
        src={product.image}
        alt={product.title}
        className="image"
        style={{ objectFit: "contain" }}
      />
      <div className="card-body">
        <div className="text-content">
          <h6
            className="card-title title"
            title={product.title}>
            {product.title}
          </h6>
          <p className="price">
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div className="buttons-content">
          <NavLink to={`/products/${product.id}`} className="btn btn-primary details-button" >
            Mais detalhes
          </NavLink>
          <div className="icons-content" >
            <button
              style={{ all: 'unset' }}
              onClick={() => setFavorite(product)}
            >
              <i className="fa-solid fa-star start" ></i>
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

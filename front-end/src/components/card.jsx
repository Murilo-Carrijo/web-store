import { NavLink } from 'react-router-dom';
const Card = ({ product, openLoginForm, setOpenLoginForm }) => {
  const userIsLogged = () => {
    setOpenLoginForm(!openLoginForm);
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
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <NavLink to={`/products/${product.id}`} className="btn btn-primary" style={{ color: 'white', height: "33.33%" }}>
            Mais detalhes
          </NavLink>
          <button style={{ all: 'unset' }}>
            <i className="fa-solid fa-star" style={{color:  "#fbb913"}} onClick={userIsLogged}></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;

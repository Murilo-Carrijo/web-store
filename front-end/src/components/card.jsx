const Card = ({ product }) => {
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
          <div>
          <h6 className="card-title" style={{ fontWeight: "600", height: "33.33%" }}>
            {product.title}
          </h6>
            <p className="card-text">R$ {product.price}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a className="btn btn-primary" style={{ color: 'white', height: "33.33%" }}>
            Mais detalhes
          </a>
          <button style={{ all: 'unset' }}>
            <i className="fa-solid fa-star" style={{color:  "#fbb913"}}></i>
          </button>
          </div>
        </div>
      </div>
  )
}

export default Card;

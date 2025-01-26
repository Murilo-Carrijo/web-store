import Card from './card';
import './card-container.css';

const CardContainer = ({ products, openLoginForm, setOpenLoginForm }) => {
  return (
    <div className="card-container" >
      {products && products.map((product) => <Card product={product} openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} key={product.id} />)}
    </div>
  )
};

export default CardContainer;

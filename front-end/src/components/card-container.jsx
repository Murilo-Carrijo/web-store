import Card from './card';
import './card-container.css';

const CardContainer = ({ products }) => {
  return (
    <div className="card-container" >
      {products && products.map((product) => <Card product={product} key={product.id} />)}
    </div>
  )
};

export default CardContainer;

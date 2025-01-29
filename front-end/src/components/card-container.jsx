import Card from './card';
import './card-container.css';

const CardContainer = ({ products, checkProduct }) => {
   return (
    <div className="card-container" >
      {products && products.map((product) => <Card product={product} checkProduct={checkProduct} key={product.id} />)}
    </div>
  )
};

export default CardContainer;

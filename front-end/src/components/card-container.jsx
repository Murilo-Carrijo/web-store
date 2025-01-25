import Card from './card';

const CardContainer = ({ products }) => {
  console.log(products);
  return (
    <div style={{ border: '1px solid black', height: '92%', margin: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products && products.map((product) => <Card product={product}/>)}
    </div>
  )
};

export default CardContainer;

import Card from './card';

const CardContainer = ({ products, openLoginForm, setOpenLoginForm }) => {
  return (
    <div style={{ height: '92%', margin: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products && products.map((product) => <Card product={product} openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} key={product.id} />)}
    </div>
  )
};

export default CardContainer;

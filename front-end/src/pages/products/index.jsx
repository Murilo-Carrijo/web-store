import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsById } from '../../services/products_services';

import NavBar from "../../components/nav-bar";
import ProductLoading from "../../components/loading-product";
import LoginForm from "../../components/login-forms";
import RegisterForms from "../../components/register-forms";

const Products = ({
  openLoginForm, setOpenLoginForm, user, openRegistrerForm, setOpenRegistrerForm
}) => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductsById(productId);
      setProduct(product);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div>
      <NavBar
        user={user}
        setOpenLoginForm={setOpenLoginForm}
        openRegistrerForm={openRegistrerForm}
        setOpenRegistrerForm={setOpenRegistrerForm}
      />
      <LoginForm
        openLoginForm={openLoginForm}
        setOpenLoginForm={setOpenLoginForm}
        openRegistrerForm={openRegistrerForm}
        setOpenRegistrerForm={setOpenRegistrerForm}
      />
      <RegisterForms
        openLoginForm={openLoginForm}
        setOpenLoginForm={setOpenLoginForm}
        openRegistrerForm={openRegistrerForm}
        setOpenRegistrerForm={setOpenRegistrerForm}
      />
      <div style={{ height: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Product page</h1>
        {product ? (
          <div style={{ border: '1px solid black', height: '92%', margin: '10px', display: 'flex', justifyContent: 'center' }}>
            <img src={product.image} alt={product.title} style={{ marginRight: '20px', height: "500px", margin: "12px",objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%', marginLeft: "16px", textAlign: "start" }}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>R$ {product.price.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        ) : (
          <ProductLoading />
        )}
      </div>

    </div>
  );
};

export default Products;

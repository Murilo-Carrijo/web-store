import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products_services";

import NavBar from "../../components/nav-bar";
import CardContainer from "../../components/card-container";
import Loading from "../../components/loading";
import LoginForm from "../../components/login-forms";

const Home = ({ openLoginForm, setOpenLoginForm, user }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
     const fetchProducts = async () => {
      const products = await getAllProducts();
       setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar user={user} setOpenLoginForm={setOpenLoginForm} />
      <LoginForm openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm}  />
      <div style={{ height: '100%' }}>
        <h1>Home page</h1>
        {products.length === 0 && Array.from({ length: 20 }).map((_, i) => <Loading  key={i} />)}
        <CardContainer products={products} openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      </div>
    </div>
  )
}

export default Home;

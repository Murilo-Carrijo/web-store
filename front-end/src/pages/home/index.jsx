import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products_services";

import NavBar from "../../components/nav-bar";
import CardContainer from "../../components/card-container";
import Loading from "../../components/loading";
import LoginForm from "../../components/login-forms";
import RegisterForms from "../../components/register-forms";
import Logout from "../../components/logout";
import './home.css';
import Banner from '../../assets/bannerwebstore.png'

const Home = () => {
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
      <NavBar />
      <LoginForm />
      <RegisterForms />
      <Logout />
      <div className="home">
        <img className="home-image" src={Banner} alt="" />
        {products.length === 0 && Array.from({ length: 20 }).map((_, i) => <Loading  key={i} />)}
        <CardContainer products={products} />
      </div>
    </div>
  )
}

export default Home;

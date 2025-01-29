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
import { getCookie } from "../../utils/cookies";
import { decodeToken } from "../../utils/token";
import { getFavorites } from "../../services/favorites_services";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [checkProduct, setCheckProduct] = useState([]);
  useEffect(() => {
    const token = getCookie('token');
     const fetchProducts = async () => {
      const products = await getAllProducts();
       setProducts(products);
    }
    fetchProducts();
    fetchUser(token);
    Selectex(token);
  }, [checkProduct]);

  const fetchUser = async (token) => {
    if (token) {
      const userInfos = decodeToken(token);
      if (!userInfos) {
        setOpenLoginForm(true);
      }
    } else {
      setOpenLoginForm(true);
    }
  }

  const Selectex = async (token) => {
    const favorites = await getFavorites(token);
    const prod = favorites.map((favorite) => favorite.externalId);
    setCheckProduct(prod)
  }

  return (
    <div>
      <NavBar />
      <LoginForm />
      <RegisterForms />
      <Logout />
      <div className="home">
        <img className="home-image" src={Banner} alt="" />
        {products.length === 0 && Array.from({ length: 20 }).map((_, i) => <Loading  key={i} />)}
        <CardContainer products={products} checkProduct={checkProduct} />
      </div>
    </div>
  )
}

export default Home;

import { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import LoginForm from "../../components/login-forms";
import Loading from "../../components/loading";
import Card from "../../components/card";
import { getCookie } from "../../utils/cookies";
import { decodeToken } from "../../utils/token";
import {  getFavorites  } from '../../services/favorites_services';

const Favorites = ({ openLoginForm, setOpenLoginForm }) => {
  const [products, setProducts] = useState(false);

  const fetchFavorites = async (token) => {
    const favorites = await getFavorites(token);
    setProducts(favorites);
  };

  console.log('Products:', products);


  useEffect(() => {
    const cookieToken = getCookie('token');
    const fetchUser = async () => {
      console.log('Token:', cookieToken);
      if (cookieToken) {
        const userInfos = decodeToken(cookieToken);
        console.log('User:', userInfos);

        if (!userInfos) {
          setOpenLoginForm(true);
        }
      } else {
        setOpenLoginForm(true);
      }
    }
    fetchUser();
    fetchFavorites(cookieToken);
  }, []);

  return (
    <div>
      <NavBar />
      <LoginForm openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      <h1>Favorites page</h1>
      <div style={{ height: '92%', margin: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {!products && Array.from({ length: 5 }).map((_, i) => <Loading key={i} />)}
        {products.length === 0 && <h3>Sua lista de favoritos esta fazia.</h3>}
        {(products && products.length > 0) && products.map((product) => <Card key={product.id} product={product} openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />)}
      </div>
    </div>
  )
}

export default Favorites;

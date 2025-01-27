import { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import LoginForm from "../../components/login-forms";
import Loading from "../../components/loading";
import Card from "../../components/card";
import Logout from "../../components/logout";
import { getCookie } from "../../utils/cookies";
import { decodeToken } from "../../utils/token";
import { getFavorites } from '../../services/favorites_services';
import './favorites.css';

const Favorites = ({
  openLoginForm,
  setOpenLoginForm,
  user,
  openRegistrerForm,
  setOpenRegistrerForm,
  openLogout,
  setOpenLogout
}) => {
  const [products, setProducts] = useState(false);

  const fetchFavorites = async (token) => {
    const favorites = await getFavorites(token);
    setProducts(favorites);
  };

  useEffect(() => {
    const cookieToken = getCookie('token');
    const fetchUser = async () => {
      if (cookieToken) {
        const userInfos = decodeToken(cookieToken);
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
      <NavBar
        user={user}
        setOpenLoginForm={setOpenLoginForm}
        openRegistrerForm={openRegistrerForm}
        setOpenRegistrerForm={setOpenRegistrerForm}
        openLogout={openLogout}
        setOpenLogout={setOpenLogout}
      />
      <LoginForm openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      <Logout
        openLogout={openLogout}
        setOpenLogout={setOpenLogout}
      />
      <div className="favorites">
        {!products && Array.from({ length: 5 }).map((_, i) => <Loading key={i} />)}
        {products.length === 0 && <h3>Sua lista de favoritos esta fazia.</h3>}
        {(products && products.length > 0) && products.map((product) => <Card key={product.id} product={product} openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />)}
      </div>
    </div>
  )
}

export default Favorites;

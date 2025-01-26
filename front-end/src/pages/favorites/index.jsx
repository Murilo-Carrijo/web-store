import { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import LoginForm from "../../components/login-forms";
import { getCookie } from "../../utils/cookies";
import { decodeToken } from "../../utils/token";

const Favorites = ({ openLoginForm, setOpenLoginForm }) => {

  useEffect(() => {
    const fetchUser = async () => {
      const cookieToken = getCookie('token');
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
  }, []);

  return (
    <div>
      <NavBar />
      <LoginForm openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      <h1>Favorites page</h1>
    </div>
  )
}

export default Favorites;

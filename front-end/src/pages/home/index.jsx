import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products_services";

import NavBar from "../../components/nav-bar";
import CardContainer from "../../components/card-container";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const products = await getAllProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ border: '2px solid black', height: '100%' }}>
        <h1>Home page</h1>
        <CardContainer products={products} />
      </div>
    </div>
  )
}

export default Home;

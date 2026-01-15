import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductGrid';
import "./HomePage.css";


export function HomePage({cart}) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);    
    };    
    
    getHomeData();
    
  }, []);  //empty array means it will run once when page is created.
  

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>My Store</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products}/>
        
      </div>
    </>
  );
}

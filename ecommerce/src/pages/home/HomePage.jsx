import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';
import "./HomePage.css";



export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);

  // get the search text from url
  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      let response; 
      if (search) {
        response = await axios.get(`/api/products?search=${search}`)
        
      } else {
        response = await axios.get('/api/products');
        
      } 
      setProducts(response.data);   
    };    
    
    getHomeData();
    
  }, [search]);  //empty array means it will run once when page is created.
  

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>My Store</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
        
      </div>
    </>
  );
}

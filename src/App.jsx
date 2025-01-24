import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  const base_url = import.meta.env.VITE_BASE_URL;
  const api_path = import.meta.env.VITE_API_PATH;

  const [products,setProducts] = useState([]);
    
  const [pageInfo, setPageInfo] = useState({});

  const [isAuth,setIsAuth] = useState(false);
  

  useEffect(()=>{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    loginCheck();

  },[])

  const loginCheck = async () =>{
    try {
      const res = await axios.post(`${base_url}/api/user/check`,{});
      setIsAuth(res.data.success);
    } catch (error) {
      setIsAuth(false);
      alert(error.response.data.message);
    }
  }

  const getProducts = async (page = 1) =>{
    try {
      const res = await axios.get(`${base_url}/api/${api_path}/admin/products?page=${page}`);
      setProducts(Object.values(res.data.products));
      setPageInfo(res.data.pagination);
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  return (
    <>
      {
        isAuth?(
          <ProductsPage  getProducts={getProducts} pageInfo={pageInfo} products={products} />
        ):(
          <LoginPage loginCheck={loginCheck} getProducts={getProducts} />
        )
      }
      
    </>
  )
}

export default App
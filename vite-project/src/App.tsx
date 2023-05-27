import './App.css'
import SearchAppBar from './Component/SearchAppBar';
import Products from './Home/Products';
import { Route, Routes } from 'react-router-dom'
import ProductPage from './Page/ProductPage';
import Cart from './Page/Cart';
function App() {

  return (
    <>
    <SearchAppBar />
    <Routes>
    <Route path='/' element={<Products/>}/> 
    <Route path='/product' element={<ProductPage/>}/>
    <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default App;

import "./App.css";
import SearchAppBar from "./Component/Navbar/Navbar";
import Products from "./Home/Products";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./Page/Product/ProductPage";
import Cart from "./Page/Cart/Cart";
import React from "react";
import SearchPage from "./Page/SearchPage";
import UserPage from "./Page/Customer";
import ContactPage from "./Page/Contact";
import AdminPage from "./Admin/Products";
function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  console.log(searchTerm);

  return (
    <>
      <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/search"
          element={<SearchPage searchTerm={searchTerm} />}
        />
       <Route path="/user" element={<UserPage />} />
       <Route path="/contact" element={<ContactPage />} />
       <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;

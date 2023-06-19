// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { isUserAuthenticated } from "../../../../../helpers/auth";

// interface Product {
//   name: string;
//   description: string;
//   price: number;
// }

// const AddProduct = () => {
//   const [product, setProduct] = useState<Product>();

//   const handleAddProduct = async () => {
//     const apiUrl = "http://localhost:8080/products";
//     const response = await axios.post(apiUrl, product);

//     if (response.status === 200) {
//       alert("Product added successfully!");
//     } else {
//       alert("An error occurred while adding the product.");
//     }
//   };

//   useEffect(() => {
//     setProduct({
//       name: "",
//       description: "",
//       price: 0,
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Add Product</h1>
//       <input
//         type="text"
//         placeholder="Product name"
//         onChange={(e) => setProduct({ name: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Product description"
//         onChange={(e) => setProduct({ description: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Product price"
//         onChange={(e) => setProduct({ price: e.target.value })}
//       />
//       <button onClick={handleAddProduct}>Add Product</button>
//     </div>
//   );
// };

// export default AddProduct;

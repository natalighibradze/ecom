import React from "react";
import Carousel from "react-material-ui-carousel";
import { useAppState } from "../../Store/StoreContext";

import Mcbook from "../../img/Mcbook.jpg";
import Tv from "../../img/Tv.jpg";
import Camera from "../../img/Camera.jpg";
import { Margin } from "@mui/icons-material";
import "../../CarosuelScc/style.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { selectedProduct } from "../../Store/action";

const images = [Mcbook, Tv, Camera];

const MyCarousel = () => {
  const {dispatch } = useAppState();
  const [productId, setProductId] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const sliderProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/product/${productId}`
      );
      dispatch(selectedProduct(data));
    };
    sliderProduct();
  }, [productId]);
  
  return (
    <Carousel 
      autoPlay={false}
      indicators={true}
      className="home__carousel"
      navButtonsAlwaysVisible={true}
      navButtonsAlwaysInvisible={false}
    >
      {images.map((image, index) => (
        <img onClick={() => {
          setProductId(index);
          navigate("/product");
        }}
          key={index}
          src={image}
          alt={`ProTech ${index}`}
          className="home__image"
        />
      ))}
    </Carousel>
  );
};

export default MyCarousel;

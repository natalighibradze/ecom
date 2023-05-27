import Carousel from "react-material-ui-carousel";
import { useAppState } from "../Store/StoreContext";
// import { Key } from "react";
const MyCarousel = () => {
  const {
    state: { sliderImages },
  } = useAppState();
  console.log(sliderImages)
  return (
    <Carousel
      autoPlay={false}
      indicators={false}
      className="home__carousel"
      navButtonsAlwaysVisible={true}
      navButtonsAlwaysInvisible={false}
    >
      {sliderImages && sliderImages.map(
        (item) => (
          <img
            key={item.title}
            src={item.images?.[0]}
            alt={`Tshop ${item.title}`}
            className="home__image"
          />
        )
      )}
    </Carousel>
  );
};
export default MyCarousel;
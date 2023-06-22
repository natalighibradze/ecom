import { Box, Pagination, Stack } from "@mui/material";
import axios from "axios";
import Card from "../../Component/Card/Card";
import { useEffect, useState } from "react";
import { saveSearchedProducts } from "../../Store/action";
import { useAppState } from "../../Store/StoreContext";

const SearchPage = ({ searchTerm }: any) => {
  const { dispatch, searchedProducts, totalProducts } = useAppState();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const startIndex = pageNumber * 20;

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  console.log(searchTerm)
  useEffect(() => {
    const handleSearchSubmit = async () => {
      await axios
        .post(`http://localhost:8080/products`, {
          keyword: searchTerm,
          page_size: 20,
          page_number: startIndex,
        })
        .then((response) => {
          dispatch(
            saveSearchedProducts(
              response.data.products,
              response.data.total_found
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    handleSearchSubmit();
  }, [searchTerm, startIndex]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <MyCarousel/> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {searchedProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Stack spacing={2} mt={4}>
        <Pagination
          count={Math.ceil(totalProducts / 10)}
          page={pageNumber}
          variant="outlined"
          color="secondary"
          onChange={changePage}
        />
      </Stack>
    </div>
  );
};

export default SearchPage;

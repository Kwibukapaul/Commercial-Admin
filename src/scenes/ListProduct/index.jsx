import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchInfo = async () => {
    await fetch("http://localhost:5000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await axios.post("http://localhost:5000/removeproduct", {id: id });
    setAllProducts(prevProducts => prevProducts.filter((product) => product.id != id));
  };

  const columns = [

    { field: "id", headerName: "Id", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title}
          style={{ height: "50px", width: "50px", objectFit: "cover" }}
        />
      ),
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "oldPrice", headerName: "Old Price", flex: 1 },
    { field: "newPrice", headerName: "New Price", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => remove_product(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const mockDataProducts = allProducts.map((product, index) => ({
    id: product.id || index,
    title: product.prodName,
    oldPrice: product.old_price,
    newPrice: product.new_price,
    category: product.prodCategory,
    image: product.prodImage,
  }));

  return (
    <Box m="20px">
      <Header title="All Products List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataProducts}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default ListProduct;
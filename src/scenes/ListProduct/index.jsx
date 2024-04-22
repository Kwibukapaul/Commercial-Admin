import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "oldPrice", headerName: "Old Price", flex: 1 },
    { field: "newPrice", headerName: "New Price", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      flex: 1,
      renderCell: () => (
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchInfo = async () => {
      await fetch("http://localhost:5000/allproducts")
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
        });
    };

    fetchInfo();
  }, []);

  const mockDataProducts = allProducts.map((product,index) => ({
    id: product.prodId, // Ensure each row has a unique id
    title: product.prodName,
    oldPrice: product.old_price,
    newPrice: product.new_price,
    category: product.prodCategory,
}));
console.log(mockDataProducts);
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
        <DataGrid checkboxSelection rows={mockDataProducts} columns={columns} />
      </Box>
    </Box>
  );
};

export default ListProduct;
